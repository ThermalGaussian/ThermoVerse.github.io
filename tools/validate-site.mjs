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
assert(!js.includes("Placeholder description"), "Placeholder project descriptions must be removed");
assert(js.includes("Published in ICLR 2025"), "ThermalGaussian venue label is required");
assert(js.includes("ThermalGaussian: Thermal 3D Gaussian Splatting"), "ThermalGaussian title must include the full paper title");
assert(js.includes("Rongfeng Lu"), "ThermalGaussian authors must be listed");
assert(js.includes("Hangzhou Dianzi University"), "ThermalGaussian affiliations must be listed");
assert(js.includes("Thermography is especially valuable"), "ThermalGaussian Abstract text is required");
assert(!js.includes("Paper Thumbnail"), "ThermalGaussian Paper Thumbnail section must be removed");
assert(js.includes("lu2024thermalgaussian"), "ThermalGaussian Citation section is required");
assert(css.includes("text-align: left"), "ThermalGaussian authors and affiliations should be left aligned");
assert(css.includes("title-row"), "ThermalGaussian title and resource links should share a row");
assert(css.includes("author-item"), "ThermalGaussian authors should render as spaced items");
assert(css.includes("affiliation-item"), "ThermalGaussian affiliations should render as spaced items");
assert(css.includes("is-wide"), "ThermalGaussian Pipeline and Comparisons figures should support a wider display size");

const moduleUrl = `${pathToFileURL(path.join(root, "assets/site.js")).href}?t=${Date.now()}`;
const { works, datasets } = await import(moduleUrl);

assert(Array.isArray(works), "site.js must export works");
assert(Array.isArray(datasets), "site.js must export datasets");
assert(works.length === 4, "Expected four works");
assert(datasets.length === 4, "Expected four datasets");

const expectedWorks = new Map([
  ["thermalgaussian", "Published"],
  ["thermalgaussian-plus-plus", "Published"],
  ["thermalgaussian-x", "Submitted"],
  ["dynamic-thermal-gaussians", "Submitted"],
]);

for (const [id, status] of expectedWorks) {
  const work = works.find((item) => item.id === id);
  assert(work, `Missing work: ${id}`);
  assert(work.title, `${id} must include a title`);
  assert(work.status === status, `${work.title} must be marked ${status}`);
  assert(work.venue, `${work.title} must include a venue label`);
  assert(Array.isArray(work.sections) && work.sections.length > 0, `${work.title} must include project sections`);
  if (work.authors) {
    assert(Array.isArray(work.authors), `${work.title} authors must be an array`);
  }
  if (work.affiliations) {
    assert(Array.isArray(work.affiliations), `${work.title} affiliations must be an array`);
  }
  if (work.links) {
    assert(Array.isArray(work.links), `${work.title} links must be an array`);
    for (const link of work.links) {
      assert(link.label, `${work.title} resource links must include labels`);
      assert(link.href?.startsWith("https://"), `${work.title} ${link.label} link must be an external HTTPS URL`);
      await assertExists(link.icon);
    }
  }
  for (const section of work.sections) {
    assert(section.heading, `${work.title} section headings are required`);
    assert(section.body, `${work.title} section body copy is required`);
    assert(Array.isArray(section.figures), `${work.title} sections must expose a figures array`);
    if (!["Abstract", "Citation"].includes(section.heading)) {
      assert(section.figures.length > 0, `${work.title} non-abstract sections must include figures`);
    }
    for (const figure of section.figures) {
      await assertExists(figure.src);
      assert(figure.alt, `${work.title} figure alt text is required`);
      assert(figure.caption, `${work.title} figure captions are required`);
    }
  }
}

const thermalGaussian = works.find((item) => item.id === "thermalgaussian");
assert(
  thermalGaussian.title === "ThermalGaussian: Thermal 3D Gaussian Splatting",
  "ThermalGaussian must use the full paper title",
);
assert(
  thermalGaussian.venue === "Published in ICLR 2025",
  "ThermalGaussian must show Published in ICLR 2025",
);
assert(Array.isArray(thermalGaussian.authors) && thermalGaussian.authors.length === 8, "ThermalGaussian must list eight authors");
assert(Array.isArray(thermalGaussian.affiliations) && thermalGaussian.affiliations.length === 3, "ThermalGaussian must list three affiliations");
assert(Array.isArray(thermalGaussian.links) && thermalGaussian.links.length === 3, "ThermalGaussian must include Paper, Code, and Dataset links");
assert(!("description" in thermalGaussian), "ThermalGaussian should not include a placeholder description");
for (const link of thermalGaussian.links) {
  assert(["Paper", "Code", "Dataset"].includes(link.label), `Unexpected ThermalGaussian link: ${link.label}`);
  assert(link.href.startsWith("https://"), `${link.label} link must be an external HTTPS URL`);
  await assertExists(link.icon);
}
const thermalGaussianHeadings = thermalGaussian.sections.map((section) => section.heading);
assert(
  thermalGaussianHeadings[0] === "Pipeline" && thermalGaussianHeadings[1] === "Abstract",
  "ThermalGaussian Abstract must be directly after Pipeline",
);
assert(
  thermalGaussianHeadings.at(-1) === "Citation",
  "ThermalGaussian Citation must be the final section",
);
const abstractSection = thermalGaussian.sections.find((section) => section.heading === "Abstract");
assert(!abstractSection.figures?.length, "ThermalGaussian Abstract should be text-only");
const citationSection = thermalGaussian.sections.find((section) => section.heading === "Citation");
assert(!citationSection.figures?.length, "ThermalGaussian Citation should be text-only");
assert(citationSection.kind === "citation", "ThermalGaussian Citation should render with citation styling");
assert(citationSection.body.includes("@article{lu2024thermalgaussian"), "ThermalGaussian Citation must include the BibTeX entry");
const wideHeadings = new Set(["Pipeline", "Comparisons"]);
for (const section of thermalGaussian.sections.filter((item) => wideHeadings.has(item.heading))) {
  assert(
    section.figures.every((item) => item.size === "wide"),
    `ThermalGaussian ${section.heading} figures should be wide`,
  );
}
const compactHeadings = new Set(["Multimodal Regularization"]);
for (const section of thermalGaussian.sections.filter((item) => compactHeadings.has(item.heading))) {
  assert(
    section.figures.every((item) => item.size === "compact"),
    `ThermalGaussian ${section.heading} figures should be compact`,
  );
}
const regularizationSection = thermalGaussian.sections.find((section) => section.heading === "Multimodal Regularization");
assert(
  regularizationSection.figures.every((item) => item.size === "compact"),
  "ThermalGaussian regularization figures should be compact",
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
