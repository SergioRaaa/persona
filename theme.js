(() => {
  const columns = document.querySelectorAll(".columns .column");

  for (const column of columns) {
    const pageLink = column.querySelector(":scope > .page-link");
    const figure = column.querySelector(":scope > .image-block");
    if (!pageLink || !figure) {
      continue;
    }

    const sourceAnchor = pageLink.querySelector("a");
    const titleNode = pageLink.querySelector(".page-link__text");
    const image = figure.querySelector("img");
    if (!sourceAnchor || !titleNode || !image) {
      continue;
    }

    const posterLink = document.createElement("a");
    posterLink.className = "poster-link";
    posterLink.href = sourceAnchor.getAttribute("href") || "#";

    if (sourceAnchor.hasAttribute("target")) {
      posterLink.target = sourceAnchor.getAttribute("target") || "";
    }
    if (sourceAnchor.hasAttribute("rel")) {
      posterLink.rel = sourceAnchor.getAttribute("rel") || "";
    }

    const toneClass = Array.from(pageLink.classList).find((name) => name.startsWith("tone-"));
    if (toneClass) {
      posterLink.classList.add(toneClass);
    }

    const overlay = document.createElement("span");
    overlay.className = "poster-overlay";

    const title = document.createElement("span");
    title.className = "poster-title";
    title.textContent = (titleNode.textContent || "").trim();

    overlay.appendChild(title);
    posterLink.appendChild(image);
    posterLink.appendChild(overlay);

    figure.innerHTML = "";
    figure.appendChild(posterLink);

    column.classList.add("project-card");
    pageLink.classList.add("page-link--hidden");
  }
})();

(() => {
  const frames = document.querySelectorAll(".video-frame");
  for (const frame of frames) {
    const iframe = frame.querySelector("iframe");
    if (!iframe) {
      continue;
    }

    const reveal = () => frame.classList.add("is-loaded");

    iframe.addEventListener("load", reveal, { once: true });

    // Safety fallback: avoid permanent black placeholder if iframe load is blocked.
    window.setTimeout(reveal, 8000);
  }
})();
