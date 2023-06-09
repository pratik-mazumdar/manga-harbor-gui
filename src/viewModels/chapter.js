(async function () {
  const chapter = getPara();
  const response = await fetch(`${config.apiUrl}/images/list/${chapter}`);
  const links = await response.json();

  const imageTags = links
    .map((link) => `<img src="${config.apiUrl}/image/${link}">`)
    .join("");
  __("image-panel").innerHTML = imageTags;

  // Remove loading after images have loaded
  __("loading").remove();
})();
