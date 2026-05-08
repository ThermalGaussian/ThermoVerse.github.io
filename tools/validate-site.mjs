import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function readRequired(relativePath) {
  const absolutePath = path.join(root, relativePath);
  try {
    return await fs.readFile(absolutePath, "utf8");
  } catch {
    throw new Error(`Missing required file: ${relativePath}`);
  }
}

async function assertExists(relativePath) {
  try {
    await fs.access(path.join(root, relativePath));
  } catch {
    throw new Error(`Missing referenced asset: ${relativePath}`);
  }
}

const html = await readRequired("index.html");
const css = await readRequired("assets/site.css");
const js = await readRequired("assets/site.js");

assert(html.includes('href="assets/site.css"'), "index.html must link assets/site.css");
assert(html.includes('src="assets/site.js"'), "index.html must load assets/site.js");
assert(html.includes('id="published-works"'), "Missing Published works section");
assert(html.includes('id="submitted-works"'), "Missing Submitted works section");
assert(html.includes('id="datasets"'), "Missing Datasets section");
assert(!html.includes("RGB-Thermal Research"), "Sidebar brand subtitle should be removed");
assert(!html.includes("Research portfolio"), "Published works should not include an eyebrow label");
assert(!html.includes("Peer-reviewed projects"), "Published works should not include helper copy");
assert(!html.includes("Under review"), "Submitted works should not include an eyebrow label");
assert(!html.includes("Scene collections"), "Datasets should not include an eyebrow label");

const expectedAnchors = [
  "#thermalgaussian",
  "#thermalgaussian-plus-plus",
  "#thermalgaussian-x",
  "#dynamic-thermal-gaussians",
  "#dataset-rgbt-scenes",
  "#dataset-rgbt-scenes-plus-plus",
  "#dataset-rgbt-scenes-extend",
  "#dataset-dynamic-rgbt-scenes",
];

for (const anchor of expectedAnchors) {
  assert(html.includes(`href="${anchor}"`), `Missing sidebar link: ${anchor}`);
}

assert(css.includes("position: sticky") || css.includes("position: fixed"), "Sidebar must stay visible on desktop");
assert(css.includes("@media"), "Responsive CSS media queries are required");
assert(!css.includes("object-fit: cover"), "Images must not be cropped with object-fit: cover");
assert(!css.includes("/ cover no-repeat"), "Hero background must not use cover cropping");
assert(/loading\s*=\s*["']lazy["']/.test(js), "Images must be rendered with lazy loading");
assert(!js.includes("visual assets"), "Project headers must not show visual asset counts");
assert(js.includes("Published at ICLR 2025"), "ThermalGaussian venue label is required");

const moduleUrl = `${pathToFileURL(path.join(root, "assets/site.js")).href}?t=${Date.now()}`;
const { works, datasets } = await import(moduleUrl);

assert(Array.isArray(works), "site.js must export works");
assert(Array.isArray(datasets), "site.js must export datasets");
assert(works.length === 4, "Expected four works");
assert(datasets.length === 4, "Expected four datasets");

const expectedWorks = new Map([
  ["ThermalGaussian", "Published"],
  ["ThermalGaussian++", "Published"],
  ["ThermalGaussian-X", "Submitted"],
  ["Dynamic Thermal Gaussians", "Submitted"],
]);

for (const [title, status] of expectedWorks) {
  const work = works.find((item) => item.title === title);
  assert(work, `Missing work: ${title}`);
  assert(work.status === status, `${title} must be marked ${status}`);
  assert(Array.isArray(work.sections) && work.sections.length > 0, `${title} must include project sections`);
  for (const section of work.sections) {
    assert(section.heading, `${title} section headings are required`);
    assert(section.body, `${title} section body copy is required`);
    assert(Array.isArray(section.figures) && section.figures.length > 0, `${title} sections must include figures`);
    for (const figure of section.figures) {
      await assertExists(figure.src);
      assert(figure.alt, `${title} figure alt text is required`);
      assert(figure.caption, `${title} figure captions are required`);
    }
  }
}

const thermalGaussian = works.find((item) => item.title === "ThermalGaussian");
assert(
  thermalGaussian.venue === "Published at ICLR 2025",
  "ThermalGaussian must show Published at ICLR 2025",
);

const expectedDatasets = new Set([
  "RGBT-Scenes",
  "RGBT-Scenes++",
  "RGBT-Scenes-extend",
  "DynamicRGBT-Scenes",
]);

for (const dataset of datasets) {
  assert(expectedDatasets.has(dataset.name), `Unexpected dataset: ${dataset.name}`);
  assert(Array.isArray(dataset.scenes) && dataset.scenes.length > 0, `${dataset.name} must include scenes`);
  assert(dataset.display === "table", `${dataset.name} must render as a dataset table`);

  for (const scene of dataset.scenes) {
    assert(scene.name, `${dataset.name} has a scene without a name`);
    const modalities = Object.keys(scene.images);
    const expectedModalities = dataset.name === "DynamicRGBT-Scenes"
      ? ["RGB", "Thermal"]
      : ["RGB", "Thermal", "MSX"];
    assert(
      expectedModalities.every((key) => modalities.includes(key)),
      `${dataset.name}/${scene.name} must include ${expectedModalities.join(", ")}`,
    );
    for (const imagePath of Object.values(scene.images)) {
      await assertExists(imagePath);
    }
  }
}

const rgbtScenes = datasets.find((dataset) => dataset.name === "RGBT-Scenes");
assert(rgbtScenes.caption === "Each scene in the RGBT-Scenes dataset is displayed", "RGBT-Scenes table caption is required");
assert(
  rgbtScenes.scenes.every((item) => item.views && item.temperature),
  "RGBT-Scenes scenes must include Views and Temp. Range metadata",
);

console.log(`Validated ${works.length} works and ${datasets.length} datasets.`);
