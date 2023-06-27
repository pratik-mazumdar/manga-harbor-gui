(async function () {
  const mangaId = getPara(2); //19e506asdfe116-4458-b031-kjadsfjsdafj
  let chapterIndex = parseInt(getPara()); // 1
  const chapterList = JSON.parse(localStorage.getItem(mangaId));
  const chapter = chapterList[chapterIndex];

  __("chapter_name").innerText = chapter.title;

  //Back logic
  if (chapterIndex === 0) {
    __("next").innerText = "";
  }
  __("back").onclick = function () {
    window.location.href = `${
      config.baseUrl
    }/chapter/${mangaId}/${++chapterIndex}`;
  };

  // Next logic
  if (chapterIndex === chapterList.length - 1) {
    __("back").innerText = "";
  }
  __("next").onclick = function () {
    window.location.href = `${
      config.baseUrl
    }/chapter/${mangaId}/${--chapterIndex}`;
  };

  const response = await fetch(`${config.apiUrl}/images/list/${chapter.id}`);
  const links = await response.json();
  const imageTags = links
    .map((link) => `<img src="${config.apiUrl}/image/${link}">`)
    .join("");
  __("image-panel").innerHTML = imageTags;

  // Remove loading after images have loaded
  __("loading").remove();
})();
