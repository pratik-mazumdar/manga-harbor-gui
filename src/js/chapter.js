const { __, urls, getParams, searchBar } = require("./lib");
searchBar();
(async function () {
  const mangaId = getParams(2); //19e506asdfe116-4458-b031-kjadsfjsdafj
  let chapterIndex = parseInt(getParams()); // 1
  // eslint-disable-next-line no-unused-vars
  var disqus_config = function () {
    this.page.url = window.location.href;
    this.page.identifier = mangaId;
  };

  // DON'T EDIT BELOW THIS LINE
  var d = document,
    s = d.createElement("script");
  s.src = "https://mangaharbor-net.disqus.com/embed.js";
  s.setAttribute("data-timestamp", +new Date());
  (d.head || d.body).appendChild(s);

  const chapterList = JSON.parse(localStorage.getItem(mangaId));
  const chapter = chapterList[chapterIndex];

  __("chapter_name").innerText = chapter.title;

  //Back logic
  if (chapterIndex === 0) {
    __("next").innerText = "";
  }
  __("back").onclick = function () {
    window.location.href = `${urls.base}/chapter/${mangaId}/${++chapterIndex}`;
  };

  // Next logic
  if (chapterIndex === chapterList.length - 1) {
    __("back").innerText = "";
  }
  __("next").onclick = function () {
    window.location.href = `${urls.base}/chapter/${mangaId}/${--chapterIndex}`;
  };

  // Set back link so user can go back to manga page
  __("current_manga_link").href = `${urls.base}/manga?id=${mangaId}`;

  const response = await fetch(`${urls.images}/list/${chapter.id}`);
  const links = await response.json();
  const imageTags = links
    .map((link) => `<img src="${urls.image}/${link}">`)
    .join("");
  __("image-panel").innerHTML = imageTags;

  // Remove loading after images have loaded
  __("loading").remove();
})();
