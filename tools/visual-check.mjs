import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import http from "node:http";
import net from "node:net";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const outputDir = path.join(root, ".site-check");
const moduleUrl = `${pathToFileURL(path.join(root, "assets/site.js")).href}?t=${Date.now()}`;
const { works, datasets } = await import(moduleUrl);
const expectedWorkFigures = works.reduce(
  (total, work) => total + work.sections.reduce((sectionTotal, section) => sectionTotal + section.figures.length, 0),
  0,
);
const expectedResourceLinks = works.reduce((total, work) => total + (work.links?.length ?? 0), 0);
const expectedSceneCount = datasets.reduce((total, dataset) => total + dataset.scenes.length, 0);
const expectedDatasetImages = datasets.reduce(
  (total, dataset) => total + dataset.scenes.reduce((sceneTotal, scene) => sceneTotal + Object.keys(scene.images).length, 0),
  0,
);
const expectedMainImages = expectedWorkFigures + expectedResourceLinks + expectedDatasetImages;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
  }[ext] ?? "application/octet-stream";
}

async function startServer() {
  const server = http.createServer(async (req, res) => {
    try {
      const requestUrl = new URL(req.url ?? "/", "http://127.0.0.1");
      const cleanPath = requestUrl.pathname === "/" ? "/index.html" : decodeURIComponent(requestUrl.pathname);
      const filePath = path.resolve(root, `.${cleanPath}`);
      if (!filePath.startsWith(root)) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
      }
      const data = await fs.readFile(filePath);
      res.writeHead(200, {
        "Cache-Control": "no-store",
        "Content-Type": contentType(filePath),
      });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return {
    server,
    url: `http://127.0.0.1:${server.address().port}/`,
  };
}

async function waitForJson(url, timeoutMs = 10_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response.json();
      }
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
  }
  throw new Error(`Timed out waiting for ${url}`);
}

class CdpClient {
  constructor(wsUrl) {
    this.nextId = 1;
    this.pending = new Map();
    this.events = new Map();
    this.ws = new WebSocket(wsUrl);
  }

  async open() {
    await new Promise((resolve, reject) => {
      this.ws.addEventListener("open", resolve, { once: true });
      this.ws.addEventListener("error", reject, { once: true });
    });

    this.ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) {
          reject(new Error(message.error.message));
        } else {
          resolve(message.result);
        }
        return;
      }

      const listeners = this.events.get(message.method) ?? [];
      for (const listener of listeners) {
        listener(message.params);
      }
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
  }

  once(method) {
    return new Promise((resolve) => {
      const listener = (params) => {
        this.events.set(
          method,
          (this.events.get(method) ?? []).filter((item) => item !== listener),
        );
        resolve(params);
      };
      this.events.set(method, [...(this.events.get(method) ?? []), listener]);
    });
  }

  close() {
    this.ws.close();
  }
}

async function createPage(debugPort) {
  const response = await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, {
    method: "PUT",
  });
  assert(response.ok, "Unable to create a browser target");
  const target = await response.json();
  const client = new CdpClient(target.webSocketDebuggerUrl);
  await client.open();
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  return client;
}

async function inspectViewport(client, pageUrl, viewport, screenshotName) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.mobile,
  });

  const loaded = client.once("Page.loadEventFired");
  await client.send("Page.navigate", { url: pageUrl });
  await loaded;
  await client.send("Runtime.evaluate", {
    awaitPromise: true,
    expression: `Promise.all([...document.images].map((image) => {
      image.loading = "eager";
      return image.decode().catch(() => null);
    }))`,
  });

  let metrics;
  for (let index = 0; index < 20; index += 1) {
    const result = await client.send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => {
        const hero = document.querySelector(".hero-content")?.getBoundingClientRect();
        return {
          title: document.title,
          projects: document.querySelectorAll(".project-card").length,
          datasets: document.querySelectorAll(".dataset-block").length,
          scenes: document.querySelectorAll(".dataset-row").length,
          tables: document.querySelectorAll(".dataset-table").length,
          workFigures: document.querySelectorAll(".work-figure").length,
          wideFigures: document.querySelectorAll("#thermalgaussian .work-figure.is-wide").length,
          resourceLinks: document.querySelectorAll(".project-card .resource-link").length,
          images: document.querySelectorAll("main img").length,
          projectImagesLoaded: [...document.querySelectorAll(".work-figure img")].every((image) => image.complete && image.naturalWidth > 0),
          croppedProjectImages: [...document.querySelectorAll(".work-figure img")].filter((image) => {
            if (!image.naturalWidth || !image.naturalHeight) {
              return true;
            }
            const rendered = image.getBoundingClientRect();
            const naturalRatio = image.naturalWidth / image.naturalHeight;
            const renderedRatio = rendered.width / rendered.height;
            return Math.abs(naturalRatio - renderedRatio) > 0.03;
          }).length,
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          bodyScrollWidth: document.body.scrollWidth,
          heroRight: hero ? Math.round(hero.right) : null,
          viewportWidth: window.innerWidth,
          overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        };
      })()`,
    });
    metrics = result.result.value;
    if (
      metrics.projects === 4 &&
      metrics.datasets === 4 &&
      metrics.scenes === 36 &&
      metrics.tables === 4 &&
      metrics.projectImagesLoaded
    ) {
      break;
    }
    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  const screenshot = await client.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  await fs.writeFile(path.join(outputDir, screenshotName), screenshot.data, "base64");

  return metrics;
}

const staticServer = await startServer();
let edge;

try {
  await fs.mkdir(outputDir, { recursive: true });
  const debugPort = await getFreePort();
  const userDataDir = path.join(outputDir, `edge-cdp-${Date.now()}`);

  edge = spawn(edgePath, [
    "--headless=new",
    "--disable-gpu",
    "--disable-crash-reporter",
    "--disable-crashpad",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${userDataDir}`,
    "about:blank",
  ], {
    stdio: "ignore",
  });

  await waitForJson(`http://127.0.0.1:${debugPort}/json/version`);
  const desktop = await createPage(debugPort);
  const mobile = await createPage(debugPort);

  const desktopMetrics = await inspectViewport(
    desktop,
    staticServer.url,
    { width: 1440, height: 1000, mobile: false },
    "desktop-cdp.png",
  );
  const mobileMetrics = await inspectViewport(
    mobile,
    staticServer.url,
    { width: 390, height: 900, mobile: true },
    "mobile-cdp.png",
  );

  desktop.close();
  mobile.close();

  assert(desktopMetrics.projects === works.length, "Desktop render must include all projects");
  assert(mobileMetrics.projects === works.length, "Mobile render must include all projects");
  assert(desktopMetrics.datasets === datasets.length, "Desktop render must include all datasets");
  assert(mobileMetrics.datasets === datasets.length, "Mobile render must include all datasets");
  assert(desktopMetrics.scenes === expectedSceneCount, "Desktop render must include all scenes");
  assert(mobileMetrics.scenes === expectedSceneCount, "Mobile render must include all scenes");
  assert(desktopMetrics.tables === datasets.length, "Desktop render must include all dataset tables");
  assert(mobileMetrics.tables === datasets.length, "Mobile render must include all dataset tables");
  assert(desktopMetrics.workFigures === expectedWorkFigures, "Desktop render must include all work figures");
  assert(mobileMetrics.workFigures === expectedWorkFigures, "Mobile render must include all work figures");
  assert(desktopMetrics.wideFigures === 3, "Desktop ThermalGaussian Pipeline and Comparisons figures must be wide");
  assert(mobileMetrics.wideFigures === 3, "Mobile ThermalGaussian Pipeline and Comparisons figures must be wide");
  assert(desktopMetrics.resourceLinks === expectedResourceLinks, "Desktop render must include all resource links");
  assert(mobileMetrics.resourceLinks === expectedResourceLinks, "Mobile render must include all resource links");
  assert(desktopMetrics.croppedProjectImages === 0, "Desktop project images must preserve natural aspect ratios");
  assert(mobileMetrics.croppedProjectImages === 0, "Mobile project images must preserve natural aspect ratios");
  assert(desktopMetrics.images === expectedMainImages, "Desktop render must include all main images and resource icons");
  assert(mobileMetrics.images === expectedMainImages, "Mobile render must include all main images and resource icons");
  assert(!desktopMetrics.overflowX, "Desktop viewport has horizontal overflow");
  assert(!mobileMetrics.overflowX, "Mobile viewport has horizontal overflow");

  console.log(JSON.stringify({
    url: staticServer.url,
    desktop: desktopMetrics,
    mobile: mobileMetrics,
    screenshots: [
      ".site-check/desktop-cdp.png",
      ".site-check/mobile-cdp.png",
    ],
  }, null, 2));
} finally {
  staticServer.server.close();
  if (edge && !edge.killed) {
    edge.kill();
  }
}
