export const works = [
  {
    id: "thermalgaussian",
    title: "ThermalGaussian",
    status: "Published",
    description:
      "Placeholder description: a thermal-aware 3D Gaussian Splatting project for paired RGB and thermal scene reconstruction.",
    images: [
      {
        src: "projects/thermalgaussian/pipeline.png",
        caption: "Pipeline overview",
      },
      {
        src: "projects/thermalgaussian/comparison1.png",
        caption: "Qualitative comparison I",
      },
      {
        src: "projects/thermalgaussian/comparison2.png",
        caption: "Qualitative comparison II",
      },
      {
        src: "projects/thermalgaussian/Point_all.png",
        caption: "Point visualization",
      },
      {
        src: "projects/thermalgaussian/dynamic_loss.png",
        caption: "Dynamic loss illustration",
      },
      {
        src: "projects/thermalgaussian/paper.png",
        caption: "Paper thumbnail",
      },
    ],
  },
  {
    id: "thermalgaussian-plus-plus",
    title: "ThermalGaussian++",
    status: "Published",
    description:
      "Placeholder description: an extended RGB-thermal Gaussian representation with qualitative results for aligned and non-aligned settings.",
    images: [
      {
        src: "projects/thermalgaussian++/comparsion.png",
        caption: "Non-aligned reconstruction comparison",
      },
      {
        src: "projects/thermalgaussian++/comparsion_x8.png",
        caption: "Non-aligned super-resolution comparison",
      },
      {
        src: "projects/thermalgaussian++/comparsion_x8_1.png",
        caption: "Aligned super-resolution comparison",
      },
    ],
  },
  {
    id: "thermalgaussian-x",
    title: "ThermalGaussian-X",
    status: "Submitted",
    description:
      "Placeholder description: a submitted study exploring RGB-thermal alignment and reconstruction under cross-modal observations.",
    images: [
      {
        src: "projects/thermalgaussian-X/comparsion.png",
        caption: "Reconstruction comparison",
      },
      {
        src: "projects/thermalgaussian-X/alignment.png",
        caption: "Alignment comparison",
      },
    ],
  },
  {
    id: "dynamic-thermal-gaussians",
    title: "Dynamic Thermal Gaussians",
    status: "Submitted",
    description:
      "Placeholder description: a submitted dynamic-scene extension for modeling temporal RGB-thermal observations with Gaussian representations.",
    images: [
      {
        src: "projects/dynamicTG/pipeline_new.png",
        caption: "Dynamic pipeline overview",
      },
    ],
  },
];

export const datasets = [
  {
    id: "dataset-rgbt-scenes",
    name: "RGBT-Scenes",
    summary:
      "A static RGB-thermal scene collection with RGB, thermal, and MSX examples.",
    scenes: [
      scene("building", {
        RGB: "datasets/RGBT-Scenes/building_rgb.jpg",
        Thermal: "datasets/RGBT-Scenes/building_thermal.jpg",
        MSX: "datasets/RGBT-Scenes/building_msx.jpg",
      }),
      scene("DailyStuff", {
        RGB: "datasets/RGBT-Scenes/DailyStuff_rgb.jpg",
        Thermal: "datasets/RGBT-Scenes/DailyStuff_thermal.jpg",
        MSX: "datasets/RGBT-Scenes/DailyStuff_msx.jpg",
      }),
      scene("dimsum", {
        RGB: "datasets/RGBT-Scenes/dimsum_rgb.jpg",
        Thermal: "datasets/RGBT-Scenes/dimsum_thermal.jpg",
        MSX: "datasets/RGBT-Scenes/dimsum_msx.jpg",
      }),
      scene("electromobile", {
        RGB: "datasets/RGBT-Scenes/electromobile_rgb.jpg",
        Thermal: "datasets/RGBT-Scenes/electromobile_thermal.jpg",
        MSX: "datasets/RGBT-Scenes/electromobile_msx.jpg",
      }),
      scene("iron_ingot", {
        RGB: "datasets/RGBT-Scenes/iron_ingot_rgb.jpg",
        Thermal: "datasets/RGBT-Scenes/iron_ingot_thermal.jpg",
        MSX: "datasets/RGBT-Scenes/iron_ingot_msx.jpg",
      }),
      scene("landscape", {
        RGB: "datasets/RGBT-Scenes/landscape_rgb.jpg",
        Thermal: "datasets/RGBT-Scenes/landscape_thermal.jpg",
        MSX: "datasets/RGBT-Scenes/landscape_msx.jpg",
      }),
      scene("Parterre", {
        RGB: "datasets/RGBT-Scenes/Parterre_rgb.jpg",
        Thermal: "datasets/RGBT-Scenes/Parterre_thermal.jpg",
        MSX: "datasets/RGBT-Scenes/Parterre_msx.jpg",
      }),
      scene("residue_truck", {
        RGB: "datasets/RGBT-Scenes/residue_truck_rgb.jpg",
        Thermal: "datasets/RGBT-Scenes/residue_truck_thermal.jpg",
        MSX: "datasets/RGBT-Scenes/residue_truck_msx.jpg",
      }),
      scene("roadblock", {
        RGB: "datasets/RGBT-Scenes/roadblock_rgb.jpg",
        Thermal: "datasets/RGBT-Scenes/roadblock_thermal.jpg",
        MSX: "datasets/RGBT-Scenes/roadblock_msx.jpg",
      }),
      scene("Rotary_Kiln", {
        RGB: "datasets/RGBT-Scenes/Rotary_Kiln_rgb.jpg",
        Thermal: "datasets/RGBT-Scenes/Rotary_Kiln_thermal.jpg",
        MSX: "datasets/RGBT-Scenes/Rotary_Kiln_msx.jpg",
      }),
    ],
  },
  {
    id: "dataset-rgbt-scenes-plus-plus",
    name: "RGBT-Scenes++",
    summary:
      "An expanded static RGB-thermal scene collection with paired RGB, thermal, and MSX examples.",
    scenes: [
      folderScene("applicances", "datasets/RGBT-Scenes++/applicances"),
      folderScene("chair", "datasets/RGBT-Scenes++/chair"),
      folderScene("glass", "datasets/RGBT-Scenes++/glass"),
      folderScene("human", "datasets/RGBT-Scenes++/human"),
      folderScene("laptop", "datasets/RGBT-Scenes++/laptop"),
      folderScene("plastic", "datasets/RGBT-Scenes++/plastic"),
      folderScene("pv_panel1", "datasets/RGBT-Scenes++/pv_panel1"),
      folderScene("pv_panel2", "datasets/RGBT-Scenes++/pv_panel2"),
      folderScene("refreshments", "datasets/RGBT-Scenes++/refreshments"),
      folderScene("switch", "datasets/RGBT-Scenes++/switch"),
    ],
  },
  {
    id: "dataset-rgbt-scenes-extend",
    name: "RGBT-Scenes-extend",
    summary:
      "Additional static RGB-thermal examples with RGB, thermal, and MSX modalities.",
    scenes: [
      scene("Cup", {
        RGB: "datasets/RGBT-Scenes-extend/Cup_rgb.jpg",
        Thermal: "datasets/RGBT-Scenes-extend/Cup_thermal.jpg",
        MSX: "datasets/RGBT-Scenes-extend/Cup_msx.jpg",
      }),
      scene("Dark", {
        RGB: "datasets/RGBT-Scenes-extend/Dark_rgb.jpg",
        Thermal: "datasets/RGBT-Scenes-extend/Dark_thermal.jpg",
        MSX: "datasets/RGBT-Scenes-extend/Dark_msx.jpg",
      }),
      scene("Plant", {
        RGB: "datasets/RGBT-Scenes-extend/Plant_rgb.jpg",
        Thermal: "datasets/RGBT-Scenes-extend/Plant_thermal.jpg",
        MSX: "datasets/RGBT-Scenes-extend/Plant_msx.jpg",
      }),
      scene("Tower", {
        RGB: "datasets/RGBT-Scenes-extend/Tower_rgb.jpg",
        Thermal: "datasets/RGBT-Scenes-extend/Tower_thermal.jpg",
        MSX: "datasets/RGBT-Scenes-extend/Tower_msx.jpg",
      }),
    ],
  },
  {
    id: "dataset-dynamic-rgbt-scenes",
    name: "DynamicRGBT-Scenes",
    summary:
      "A dynamic RGB-thermal scene collection with RGB and thermal frame examples.",
    scenes: [
      dynamicScene("Bacon"),
      dynamicScene("Candles"),
      dynamicScene("Covers"),
      dynamicScene("Foam"),
      dynamicScene("HairDryer"),
      dynamicScene("HairDryerDark"),
      dynamicScene("HeatGun"),
      dynamicScene("HeatingTable"),
      dynamicScene("HotBar"),
      dynamicScene("HotWater"),
      dynamicScene("IcePacks"),
      dynamicScene("IroningCloth"),
    ],
  },
];

function scene(name, images) {
  return { name, images };
}

function folderScene(name, basePath) {
  return scene(name, {
    RGB: `${basePath}/rgb.jpg`,
    Thermal: `${basePath}/thermal.jpg`,
    MSX: `${basePath}/msx.jpg`,
  });
}

function dynamicScene(name) {
  return scene(name, {
    RGB: `datasets/DynamicRGBT-Scenes/${name}/RGB.png`,
    Thermal: `datasets/DynamicRGBT-Scenes/${name}/Thermal.png`,
  });
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
}

function renderWorks(status, containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }

  for (const work of works.filter((item) => item.status === status)) {
    const article = createElement("article", "project-card");
    article.id = work.id;

    const header = createElement("header", "project-header");
    const meta = createElement("div", "project-meta");
    meta.append(createElement("span", "pill", work.status));
    meta.append(createElement("span", "count", `${work.images.length} visual assets`));

    header.append(meta);
    header.append(createElement("h3", null, work.title));
    header.append(createElement("p", null, work.description));

    const gallery = createElement("div", "project-gallery");
    for (const image of work.images) {
      gallery.append(renderFigure(image.src, image.caption, `${work.title}: ${image.caption}`));
    }

    article.append(header, gallery);
    container.append(article);
  }
}

function renderDatasets() {
  const container = document.getElementById("dataset-list");
  if (!container) {
    return;
  }

  for (const dataset of datasets) {
    const block = createElement("article", "dataset-block");
    block.id = dataset.id;

    const header = createElement("header", "dataset-header");
    const meta = createElement("div", "dataset-meta");
    const imageCount = dataset.scenes.reduce(
      (total, item) => total + Object.keys(item.images).length,
      0,
    );
    meta.append(createElement("span", "pill", dataset.name));
    meta.append(createElement("span", "count", `${dataset.scenes.length} scenes / ${imageCount} images`));
    header.append(meta);
    header.append(createElement("h3", null, dataset.name));
    header.append(createElement("p", null, dataset.summary));

    const grid = createElement("div", "scene-grid");
    for (const item of dataset.scenes) {
      grid.append(renderSceneCard(dataset.name, item));
    }

    block.append(header, grid);
    container.append(block);
  }
}

function renderSceneCard(datasetName, item) {
  const card = createElement("article", "scene-card");
  card.append(createElement("h4", null, item.name));

  const modalities = createElement("div", "modalities");
  const entries = Object.entries(item.images);
  if (entries.length === 2) {
    modalities.classList.add("two-column");
  }

  for (const [label, src] of entries) {
    modalities.append(renderFigure(src, label, `${datasetName} ${item.name} ${label}`));
  }

  card.append(modalities);
  return card;
}

function renderFigure(src, caption, alt) {
  const figure = createElement("figure", caption.length < 12 ? "modality" : "project-figure");
  const frame = createElement("div", "image-frame");
  const image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.loading = "lazy";
  image.decoding = "async";
  frame.append(image);
  figure.append(frame, createElement("figcaption", null, caption));
  return figure;
}

function setupActiveNavigation() {
  const navLinks = [...document.querySelectorAll("[data-nav-link]")];
  const sections = navLinks
    .map((link) => {
      const target = document.querySelector(link.hash);
      return target ? { link, target } : null;
    })
    .filter(Boolean);

  if (!("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) {
        return;
      }
      const id = `#${visible.target.id}`;
      for (const link of navLinks) {
        link.classList.toggle("is-active", link.hash === id);
      }
    },
    {
      rootMargin: "-20% 0px -62% 0px",
      threshold: [0.08, 0.18, 0.32],
    },
  );

  for (const { target } of sections) {
    observer.observe(target);
  }
}

function init() {
  renderWorks("Published", "published-grid");
  renderWorks("Submitted", "submitted-grid");
  renderDatasets();
  setupActiveNavigation();
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
}
