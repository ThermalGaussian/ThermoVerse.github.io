export const works = [
  {
    id: "thermalgaussian",
    title: "ThermalGaussian: Thermal 3D Gaussian Splatting",
    status: "Published",
    venue: "Published in ICLR 2025",
    authors: [
      author("Rongfeng Lu", "1,3,*,\u2020"),
      author("Hangyu Chen", "1,*"),
      author("Zunjie Zhu", "1,3"),
      author("Yuhang Qin", "1"),
      author("Ming Lu", "2"),
      author("Le Zhang", "1"),
      author("Chenggang Yan", "1"),
      author("Anke Xue", "1,\u2020"),
    ],
    affiliations: [
      affiliation("1", "Hangzhou Dianzi University"),
      affiliation("2", "Intel Labs China"),
      affiliation("3", "Lishui Institute of Hangzhou Dianzi University"),
    ],
    links: [
      resourceLink("Paper", "https://arxiv.org/abs/2409.07200", "plugins/thermalgaussian_paper.png"),
      resourceLink("Code", "https://github.com/chen-hangyu/Thermal-Gaussian-main", "plugins/github.png"),
      resourceLink("Dataset", "https://drive.google.com/drive/folders/1A6kdIjDe7kw-iKQkzjHNw0wgk_3V7hcp?usp=sharing", "plugins/google-drive.png"),
    ],
    sections: [
      workSection(
        "Pipeline",
        "We simultaneously construct Gaussians for RGB and thermal modalities using the point cloud obtained from multimodal initialization. Each modality's Gaussians are used to render images in their respective modality. However, the losses from different modalities are combined to jointly constrain the optimization of both sets of Gaussians. Additionally, we establish a multimodal regularization based on the number of Gaussians in each modality, which dynamically adjusts the training coefficients for both modalities.",
        [
          figure("projects/thermalgaussian/pipeline.png", "ThermalGaussian pipeline", "ThermalGaussian Overview.", "wide"),
        ],
      ),
      textSection(
        "Abstract",
        "Thermography is especially valuable for the military and other users of surveillance cameras. Some recent methods based on Neural Radiance Fields (NeRF) are proposed to reconstruct the thermal scenes in 3D from a set of thermal and RGB images. However, unlike NeRF, 3D Gaussian splatting (3DGS) prevails due to its rapid training and real-time rendering. In this work, we propose ThermalGaussian, the first thermal 3DGS approach capable of rendering high-quality images in RGB and thermal modalities. We first calibrate the RGB camera and the thermal camera to ensure that both modalities are accurately aligned. Subsequently, we use the registered images to learn the multimodal 3D Gaussians. To prevent the overfitting of any single modality, we introduce several multimodal regularization constraints. We also develop smoothing constraints tailored to the physical characteristics of the thermal modality. Besides, we contribute a real-world dataset named RGBT-Scenes, captured by a hand-hold thermal-infrared camera, facilitating future research on thermal scene reconstruction. We conduct comprehensive experiments to show that ThermalGaussian achieves photorealistic rendering of thermal images and improves the rendering quality of RGB images. With the proposed multimodal regularization constraints, we also reduced the model's storage cost by 90%. Our project page is at https://thermalgaussian.github.io/.",
      ),
      workSection(
        "Comparisons",
        "We present qualitative thermal image comparisons between our method, previous approaches(3DGS and ThermoNerf), and the corresponding ground truth images from test views. We also present qualitative RGB image comparisons between our method and 3DGS from test views.",
        [
          figure("projects/thermalgaussian/comparison1.png", "Thermal comparison", "Qualitative Thermal and MSX Comparisons.", "wide"),
          figure("projects/thermalgaussian/comparison2.png", "RGB comparison", "Qualitative RGB Comparisons.", "wide"),
        ],
      ),
      workSection(
        "Multimodal Regularization",
        "To verify the effectiveness of the multimodal regularization term, we compare adaptive regularization with manual adjustment of the thermal constraint coefficient and visualize the Gaussian distributions.",
        [
          figure("projects/thermalgaussian/dynamic_loss.png", "Multimodal regularization comparison", "(a) MR (γ) vs. fixed coefficient", "compact"),
          figure("projects/thermalgaussian/Point_all.png", "Gaussian distributions", "(b) Gaussian distributions. Left: 3DGS; Right: Ours (MSMG) + MR", "compact"),
        ],
      ),
      citationSection(
        `@article{lu2024thermalgaussian,
  title     = {ThermalGaussian: Thermal 3D Gaussian Splatting},
  author    = {Lu, Rongfeng and Chen, Hangyu and Zhu, Zunjie and Qin, Yuhang and Lu, Ming and Zhang, Le and Yan, Chenggang and Xue, Anke},
  journal   = {arXiv preprint arXiv:2409.07200},
  year      = {2024},
}`,
      ),
    ],
  },
  {
    id: "thermalgaussian-plus-plus",
    title: "ThermalGaussian++: Improving Alignment and Resolution for ThermalGaussian",
    status: "Published",
    venue: "Published in TPAMI",
    authors: [
      author("Rongfeng Lu", "1"),
      author("Chi Zhu", "1"),
      author("Quan Chen", "1"),
      author("Le Zhang", "1,\u2020"),
      author("Ming Lu", "1"),
      author("Tingyu Wang", "1"),
      author("Haofan Ren", "1"),
      author("Yitian Xue", "2"),
      author("Yunfei Guo", "1"),
      author("Chenggang Yan", "1"),
    ],
    affiliations: [
      affiliation("1", "Hangzhou Dianzi University"),
      affiliation("2", "Zhejiang University"),
    ],
    links: [
      resourceLink("Paper", "https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=11505796", "plugins/TGS_plus_plus_compressed.png"),
      resourceLink("Dataset", "https://drive.google.com/drive/folders/1A6kdIjDe7kw-iKQkzjHNw0wgk_3V7hcp?usp=sharing", "plugins/google-drive.png"),
    ],
    sections: [
      textSection(
        "Abstract",
        "Thermography is especially valuable for the military and other users of surveillance cameras. Some recent methods based on Neural Radiance Fields (NeRF) have been proposed to reconstruct thermal scenes in 3D from a set of thermal and RGB images. However, unlike NeRF, 3D Gaussian splatting (3DGS) prevails due to its rapid training and real-time rendering. In this work, we propose ThermalGaussian, the first thermal 3DGS approach capable of rendering high-quality images in RGB and thermal modalities. We first calibrate the RGB camera and the thermal camera to ensure that both modalities are accurately aligned. Subsequently, we use the registered images to learn the multimodal 3D Gaussians. To prevent the overfitting of any single modality, we introduce several multimodal regularization constraints. We also develop smoothing constraints tailored to the physical characteristics of the thermal modality. Besides, we contribute a real-world dataset named RGBT-Scenes, captured by a handheld thermal-infrared camera, facilitating future research on thermal scene reconstruction. Based on ThermalGaussian, we further introduce ThermalGaussian++ to improve the alignment and resolution of ThermalGaussian. To improve multimodal alignment, we design a multimodal pose optimization module. This module enables direct processing of non-aligned multimodal image pairs, reducing the need for professional calibration before each use. To improve thermal resolution, we also propose a multimodal joint super-resolution reconstruction module, which enhances the quality of low-resolution thermal fields. Additionally, we contribute a new dataset: RGBT-Scenes++, which offers higher-resolution thermal images. We conduct comprehensive experiments demonstrating that ThermalGaussian++ achieves photorealistic thermal rendering and improves RGB rendering quality. It significantly enhances both alignment and resolution, enabling better practical deployment. In addition, our multimodal regularization constraints reduce the model's storage requirements. The code and datasets will be released.",
      ),
      workSection(
        "Non-aligned Reconstruction",
        "We compare qualitative reconstruction results on non-aligned RGB-thermal data.",
        [
          figure("projects/thermalgaussian++/comparsion.png", "ThermalGaussian++ non-aligned reconstruction comparison", "Qualitative comparison of rendered thermal images from novel viewpoints under non-aligned RGB-thermal inputs."),
        ],
      ),
      workSection(
        "Non-aligned Super-resolution",
        "We show qualitative super-resolution results for non-aligned data.",
        [
          figure("projects/thermalgaussian++/comparsion_x8.png", "ThermalGaussian++ non-aligned super-resolution comparison", "Qualitative comparison on RGBT-Scenes++ with ×8 downsampled, non-aligned RGB-thermal inputs."),
        ],
      ),
      workSection(
        "Aligned Super-resolution",
        "We also include qualitative super-resolution results for aligned data.",
        [
          figure("projects/thermalgaussian++/comparsion_x8_1.png", "ThermalGaussian++ aligned super-resolution comparison", "Qualitative comparison on RGBT-Scenes with ×8 downsampled, aligned RGB-thermal inputs."),
        ],
      ),
      citationSection(
        `@ARTICLE{11505796,
        author={Lu, Rongfeng and Zhu, Chi and Chen, Quan and Zhang, Le and Lu, Ming and Wang, Tingyu and Ren, Haofan and Xue, Yitian and Guo, Yunfei and Yan, Chenggang},
        journal={IEEE Transactions on Pattern Analysis and Machine Intelligence}, 
        title={ThermalGaussian++: Improving Alignment and Resolution for ThermalGaussian}, 
        year={2026},
        volume={},
        number={},
        pages={1-16},
        keywords={Sonar;Feeds;Radio broadcasting;Frequency modulation;Anisotropic;Contacts;Filters;Pixel;Internet of Things;Communication systems;3DGS;Thermal Imaging;View Synthesis;Multimodal 3D Reconstruction;Temperature Field Reconstruction},
        doi={10.1109/TPAMI.2026.3689388}}`,
      ),
    ],
  },
  {
    id: "thermalgaussian-x",
    title: "ThermalGaussian-X: RGB and Thermal Alignment via 3D Gaussian Splatting",
    status: "Submitted",
    venue: "Submitted work",
    // authors: [
    //   author("Rongfeng Lu", "1"),
    //   author("Chi Zhu", "1"),
    //   author("Quan Chen", "1"),
    //   author("Le Zhang", "1,\u2020"),
    //   author("Ming Lu", "1"),
    //   author("Tingyu Wang", "1"),
    //   author("Haofan Ren", "1"),
    //   author("Yitian Xue", "2"),
    //   author("Yunfei Guo", "1"),
    //   author("Chenggang Yan", "1"),
    // ],
    // affiliations: [
    //   affiliation("1", "Hangzhou Dianzi University"),
    //   affiliation("2", "Zhejiang University"),
    // ],
    // links: [
    //   resourceLink("Paper", "https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=11505796", "plugins/TGS_plus_plus.png"),
    //   resourceLink("Dataset", "https://drive.google.com/drive/folders/1A6kdIjDe7kw-iKQkzjHNw0wgk_3V7hcp?usp=sharing", "plugins/google-drive.png"),
    // ],
    sections: [
      textSection(
        "Abstract",
        "Multimodal image alignment is an essential step for vision tasks that rely on multiple modalities. Most existing methods use deep networks to warp one image to match another. Although effective, such warping is not 3D-aware and often alters the image structure, causing distortion. To address this problem, we propose ThermalGaussian-X, a 3D-aware method that aligns multimodal images via 3D Gaussian Splatting (3DGS). Our model constructs a shared 3DGS model from unaligned multiview RGB and thermal images, automatically learning the relative camera poses between modalities. Specifically, we treat the relative poses as learnable parameters, which are optimized during 3DGS training. We design a dynamic coordinate re-anchoring to localize the coordinate systems, resulting in a stable gradient. We also design an iterative pose regularization to ensure the global consistency of relative camera poses across all viewpoints. Finally, we introduce a multi-task regularization term to improve training stability. Experiments demonstrate that our method achieves state-of-the-art results in both unaligned multimodal reconstruction and multimodal alignment. The code will be released.",
      ),
      workSection(
        "Reconstruction Comparison",
        "We present qualitative reconstruction comparisons for the submitted ThermalGaussian-X project.",
        [
          figure("projects/thermalgaussian-X/comparsion.png", "ThermalGaussian-X reconstruction comparison", "Reconstruction comparison"),
        ],
      ),
      workSection(
        "Alignment Comparison",
        "We visualize the alignment behavior between RGB and thermal observations.",
        [
          figure("projects/thermalgaussian-X/alignment.png", "ThermalGaussian-X alignment comparison", "Alignment comparison"),
        ],
      ),
    ],
  },
  {
    id: "dynamic-thermal-gaussians",
    title: "Dynamic Thermal Gaussians: Multimodal 4D Gaussian Splatting",
    status: "Submitted",
    venue: "Submitted work",
    authors: [
      author("Rongfeng Lu", "1"),
      author("Lifeng Lin", "1"),
      author("Xiaobao Wei", "2"),
      author("Quan Chen", "3"),
      author("Ming Lu", "1"),
      author("Yitian Xue", "4"),
      author("Yaoqi Sun", "5"),
      author("Yuhan Gao", "1"),
      author("Anke Xue", "1"),
      author("Chenggang Yan", "1"),
    ],
    affiliations: [
      affiliation("1", "Hangzhou Dianzi University"),
      affiliation("2", "xxx University"),
      affiliation("3", "Jiaxing University"),
      affiliation("4", "Zhejiang University"),
      affiliation("5", "Lishui University"),
    ],
    // links: [
    //   resourceLink("Paper", "https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=11505796", "plugins/TGS_plus_plus.png"),
    //   resourceLink("Dataset", "https://drive.google.com/drive/folders/1A6kdIjDe7kw-iKQkzjHNw0wgk_3V7hcp?usp=sharing", "plugins/google-drive.png"),
    // ],
    sections: [
      textSection(
        "Abstract",
        "Thermography plays a vital role in military and broader thermal analysis applications. Recent progress in 3D thermal reconstruction has extended temperature analysis from 2D to 3D space, yet most existing works assume static temperature distributions, neglecting the temporal dynamics of heat transfer in real-world environments. To address this limitation, we propose the first 4D thermal field reconstruction framework that simultaneously models dynamic RGB scenes and rapidly evolving thermal fields. Specifically, we introduce a multimodal dynamic scene representation that anchors both the color and thermal modalities to a shared geometric substrate, ensuring their consistency under spatiotemporal deformations. We further design multimodal embeddings to enhance the motion expressiveness for each modality, and propose a multimodal routing mechanism that retains a unified set of shared multimodal Gaussians as the geometric backbone while adaptively spawning modality-specific Gaussians to strengthen the representational capacity in detail-rich regions of each individual modality. In addition, we contribute a novel benchmark dataset featuring high-frequency temperature variations to facilitate the evaluation of 4D reconstruction. Extensive experiments demonstrate that our method achieves high-fidelity spatiotemporal reconstruction of both appearance and temperature. The code and dataset will be released.",
      ),
      workSection(
        "Dynamic Pipeline",
        "This figure illustrates the dynamic RGB-thermal Gaussian modeling pipeline.",
        [
          figure("projects/dynamicTG/pipeline_new.png", "Dynamic Thermal Gaussians pipeline", "Dynamic pipeline overview"),
        ],
      ),
    ],
  },
];

export const datasets = [
  {
    id: "dataset-rgbt-scenes",
    name: "RGBT-Scenes",
    display: "table",
    summary:
      "The following 10 scenes were selected for both qualitative and quantitative analysis in our paper.",
    caption: "Each scene in the RGBT-Scenes dataset is displayed",
    scenes: [
      scene("Dimsum", rgbtPath("dimsum"), { views: "134(train) 20(test)", temperature: "23.1\u00b0C - 60.0\u00b0C" }),
      scene("Daily Stuff", {
        RGB: "datasets/RGBT-Scenes/DailyStuff_rgb.jpg",
        Thermal: "datasets/RGBT-Scenes/DailyStuff_thermal.jpg",
        MSX: "datasets/RGBT-Scenes/DailyStuff_msx.jpg",
      }, { views: "68(train) 10(test)", temperature: "17.5\u00b0C - 56.3\u00b0C" }),
      scene("Electric Bicycle", rgbtPath("electromobile"), { views: "42(train) 6(test)", temperature: "14.5\u00b0C - 18.5\u00b0C" }),
      scene("Roadblock", rgbtPath("roadblock"), { views: "62(train) 9(test)", temperature: "22.0\u00b0C - 27.0\u00b0C" }),
      scene("Truck", rgbtPath("residue_truck"), { views: "64(train) 9(test)", temperature: "30.6\u00b0C - 249.0\u00b0C" }),
      scene("Rotary Kiln", {
        RGB: "datasets/RGBT-Scenes/Rotary_Kiln_rgb.jpg",
        Thermal: "datasets/RGBT-Scenes/Rotary_Kiln_thermal.jpg",
        MSX: "datasets/RGBT-Scenes/Rotary_Kiln_msx.jpg",
      }, { views: "92(train) 14(test)", temperature: "5.0\u00b0C - 60.4\u00b0C" }),
      scene("Building", rgbtPath("building"), { views: "238(train) 35(test)", temperature: "15.0\u00b0C - 24.0\u00b0C" }),
      scene("Iron ingot", rgbtPath("iron_ingot"), { views: "53(train) 8(test)", temperature: "38.0\u00b0C - 350.0\u00b0C" }),
      scene("Parterre", {
        RGB: "datasets/RGBT-Scenes/Parterre_rgb.jpg",
        Thermal: "datasets/RGBT-Scenes/Parterre_thermal.jpg",
        MSX: "datasets/RGBT-Scenes/Parterre_msx.jpg",
      }, { views: "57(train) 9(test)", temperature: "19.5\u00b0C - 27.5\u00b0C" }),
      scene("Landscape", rgbtPath("landscape"), { views: "90(train) 13(test)", temperature: "16.0\u00b0C - 23.0\u00b0C" }),
    ],
  },
  {
    id: "dataset-rgbt-scenes-plus-plus",
    name: "RGBT-Scenes++",
    display: "table",
    summary:
      "Additional RGB-thermal scenes are displayed with RGB, thermal, and MSX examples.",
    caption: "Each scene in the RGBT-Scenes++ dataset is displayed",
    scenes: [
      folderScene("Applicances", "datasets/RGBT-Scenes++/applicances"),
      folderScene("Human", "datasets/RGBT-Scenes++/human"),
      folderScene("Refreshments", "datasets/RGBT-Scenes++/refreshments"),
      folderScene("Switch", "datasets/RGBT-Scenes++/switch"),
      folderScene("Plastic", "datasets/RGBT-Scenes++/plastic"),
      folderScene("Glass", "datasets/RGBT-Scenes++/glass"),
      folderScene("Chair", "datasets/RGBT-Scenes++/chair"),
      folderScene("Laptop", "datasets/RGBT-Scenes++/laptop"),
      folderScene("PV Panel 1", "datasets/RGBT-Scenes++/pv_panel1"),
      folderScene("PV Panel 2", "datasets/RGBT-Scenes++/pv_panel2"),
    ],
  },
  {
    id: "dataset-rgbt-scenes-extend",
    name: "RGBT-Scenes-extend",
    display: "table",
    summary:
      "The following are the four scenes extended by RGBT-Scenes.",
    caption: "Each scene in the expanded RGBT-Scenes dataset is displayed",
    scenes: [
      prefixedScene("Glass Cup", "datasets/RGBT-Scenes-extend/Cup", {
        views: "123(train) 18(test)",
        temperature: "17.0°C - 36.6°C",
      }),
      prefixedScene("Transmission Tower", "datasets/RGBT-Scenes-extend/Tower", {
        views: "154(train) 23(test)",
        temperature: "-26.4°C - 23.7°C",
      }),
      prefixedScene("Dark Scene", "datasets/RGBT-Scenes-extend/Dark", {
        views: "75(train) 11(test)",
        temperature: "17.5°C - 21.6°C",
      }),
      prefixedScene("Plant Equipment", "datasets/RGBT-Scenes-extend/Plant", {
        views: "192(train) 28(test)",
        temperature: "27.8°C - 54.9°C",
      }),
    ],
  },
  {
    id: "dataset-dynamic-rgbt-scenes",
    name: "DynamicRGBT-Scenes",
    display: "table",
    summary:
      "Dynamic RGB-thermal scenes are displayed with RGB and thermal frame examples.",
    caption: "Each scene in the DynamicRGBT-Scenes dataset is displayed",
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

function workSection(heading, body, figures) {
  return { heading, body, figures };
}

function textSection(heading, body) {
  return { heading, body, figures: [] };
}

function citationSection(body) {
  return { heading: "Citation", body, figures: [], kind: "citation" };
}

function figure(src, alt, caption, size = "full") {
  return { src, alt, caption, size };
}

function author(name, marks) {
  return { name, marks };
}

function affiliation(index, name) {
  return { index, name };
}

function resourceLink(label, href, icon) {
  return { label, href, icon };
}

function scene(name, images, metadata = {}) {
  return {
    name,
    images,
    views: metadata.views ?? "-",
    temperature: metadata.temperature ?? "-",
  };
}

function rgbtPath(name) {
  return {
    RGB: `datasets/RGBT-Scenes/${name}_rgb.jpg`,
    Thermal: `datasets/RGBT-Scenes/${name}_thermal.jpg`,
    MSX: `datasets/RGBT-Scenes/${name}_msx.jpg`,
  };
}

function folderScene(name, basePath) {
  return scene(name, {
    RGB: `${basePath}/rgb.jpg`,
    Thermal: `${basePath}/thermal.jpg`,
    MSX: `${basePath}/msx.jpg`,
  });
}

function prefixedScene(name, basePath, metadata = {}) {
  return scene(name, {
    RGB: `${basePath}_rgb.jpg`,
    Thermal: `${basePath}_thermal.jpg`,
    MSX: `${basePath}_msx.jpg`,
  }, metadata);
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
    const titleBlock = createElement("div", "project-title-block");
    titleBlock.append(createElement("span", "pill", work.venue));
    const titleRow = createElement("div", "title-row");
    titleRow.append(createElement("h3", null, work.title));
    if (work.links?.length) {
      titleRow.append(renderResourceLinks(work.links, work.title));
    }
    titleBlock.append(titleRow);
    if (work.authors?.length) {
      titleBlock.append(renderAuthorLine(work.authors));
    }
    if (work.affiliations?.length) {
      titleBlock.append(renderAffiliations(work.affiliations));
    }
    if (work.description) {
      titleBlock.append(createElement("p", null, work.description));
    }
    header.append(titleBlock);

    const body = createElement("div", "project-body");
    for (const section of work.sections) {
      body.append(renderWorkSection(section));
    }

    article.append(header, body);
    container.append(article);
  }
}

function renderWorkSection(section) {
  const block = createElement("section", "work-section");
  block.append(createElement("h4", null, section.heading));
  if (section.kind === "citation") {
    block.append(createElement("pre", "citation-block", section.body));
  } else {
    block.append(createElement("p", null, section.body));
  }

  if (section.figures.length) {
    const figureList = createElement("div", "work-figure-list");
    for (const item of section.figures) {
      figureList.append(renderWorkFigure(item));
    }
    block.append(figureList);
  }

  return block;
}

function renderWorkFigure(item) {
  const figureElement = createElement("figure", "work-figure");
  if (item.size === "compact") {
    figureElement.classList.add("is-compact");
  }
  if (item.size === "wide") {
    figureElement.classList.add("is-wide");
  }
  const image = document.createElement("img");
  image.src = item.src;
  image.alt = item.alt;
  image.loading = "lazy";
  image.decoding = "async";
  figureElement.append(image, createElement("figcaption", null, item.caption));
  return figureElement;
}

function renderAuthorLine(authors) {
  const list = createElement("p", "author-line");
  for (const item of authors) {
    const authorItem = createElement("span", "author-item");
    const name = createElement("strong", null, item.name);
    const marks = document.createElement("sup");
    marks.textContent = item.marks;
    authorItem.append(name, marks);
    list.append(authorItem);
  }
  return list;
}

function renderAffiliations(affiliations) {
  const list = createElement("p", "affiliation-line");
  for (const item of affiliations) {
    const affiliationItem = createElement("span", "affiliation-item");
    const mark = document.createElement("sup");
    mark.textContent = item.index;
    affiliationItem.append(mark, document.createTextNode(item.name));
    list.append(affiliationItem);
  }
  return list;
}

function renderResourceLinks(links, workTitle) {
  const list = createElement("div", "resource-links");
  for (const item of links) {
    const link = document.createElement("a");
    link.className = "resource-link";
    link.href = item.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${item.label} for ${workTitle}`);

    const icon = document.createElement("img");
    icon.src = item.icon;
    icon.alt = "";
    icon.loading = "lazy";
    icon.decoding = "async";

    link.append(icon, createElement("span", null, item.label));
    list.append(link);
  }
  return list;
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
    header.append(createElement("h3", null, dataset.name));
    header.append(createElement("p", null, dataset.summary));

    block.append(header, renderDatasetTable(dataset));
    container.append(block);
  }
}

function renderDatasetTable(dataset) {
  const wrapper = createElement("div", "dataset-table-wrap");
  const table = createElement("table", "dataset-table");
  const hasMsx = dataset.scenes.some((item) => "MSX" in item.images);

  table.append(createElement("caption", null, dataset.caption));

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headers = hasMsx
    ? ["Scene", "RGB", "Thermal", "MSX", "Views", "Temp. Range"]
    : ["Scene", "RGB", "Thermal", "Views", "Temp. Range"];
  for (const header of headers) {
    headerRow.append(createElement("th", header === "Temp. Range" ? "temperature" : null, header));
  }
  thead.append(headerRow);

  const tbody = document.createElement("tbody");
  for (const item of dataset.scenes) {
    tbody.append(renderDatasetRow(dataset.name, item, hasMsx));
  }

  table.append(thead, tbody);
  wrapper.append(table);
  return wrapper;
}

function renderDatasetRow(datasetName, item, hasMsx) {
  const row = createElement("tr", "dataset-row");
  const sceneCell = document.createElement("td");
  sceneCell.append(createElement("strong", null, item.name));
  row.append(sceneCell);

  row.append(renderDatasetImageCell(datasetName, item, "RGB"));
  row.append(renderDatasetImageCell(datasetName, item, "Thermal"));
  if (hasMsx) {
    row.append(renderDatasetImageCell(datasetName, item, "MSX"));
  }
  row.append(createElement("td", null, item.views));
  row.append(createElement("td", "temperature", item.temperature));

  return row;
}

function renderDatasetImageCell(datasetName, item, modality) {
  const cell = document.createElement("td");
  const imagePath = item.images[modality];
  if (!imagePath) {
    cell.textContent = "-";
    return cell;
  }

  const image = document.createElement("img");
  image.className = "dataset-thumb";
  image.src = imagePath;
  image.alt = `${datasetName} ${item.name} ${modality}`;
  image.loading = "lazy";
  image.decoding = "async";
  cell.append(image);
  return cell;
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
