const { $, createDiscord, getParams, searchBar, defaultTo } = require("./lib");
const { urls } = require("./lib/urls");

(async function () {
  const mangaId = getParams(2); //e06asdfe116-48-b31-kjadsfjsdafj
  let chapterIndex = parseInt(getParams()); // 1
  const chapterList = JSON.parse(localStorage.getItem(mangaId));
  const chapter = chapterList[chapterIndex];

  searchBar(urls.search);

  chapterIndex = defaultTo(chapterIndex, 0);

  $(".chapter_name").text(chapter.title);

  //Next logic
  if (chapterIndex === 0) {
    $(".next").text("");
  }
  $(".next").on("click", function () {
    window.location.href = `${urls.base}/chapter/${mangaId}/${--chapterIndex}`;
  });

  // Back logic
  if (chapterIndex === chapterList.length - 1) {
    $(".back").text("");
  }
  $(".back").on("click", function () {
    window.location.href = `${urls.base}/chapter/${mangaId}/${++chapterIndex}`;
  });

  // Set back link so user can go back to manga page
  $("#current_manga_link").attr("href", `${urls.base}/manga/${mangaId}`);

  const response = await fetch(`${urls.images}/list/${chapter.id}`);
  const links = await response.json();
  const imageTags = links
    .map((link) => `<img src="${urls.image}/${link}">`)
    .join("");
  $("#image-panel").html(imageTags);

  // Remove loading after images have loaded
  $("#loading").remove();
  const disqus_config = function () {
    this.page.url = window.location.href;
    this.page.identifier = mangaId;
  };

  // DON'T EDIT BELOW THIS LINE
  var d = document,
    s = d.createElement("script");
  s.src = "https://mangaharbor-net.disqus.com/embed.js";
  s.setAttribute("data-timestamp", +new Date());
  (d.head || d.body).appendChild(s);
})();
