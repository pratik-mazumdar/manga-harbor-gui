const { $, getParams, defaultTo, setContinueReading } = require("./lib");
const { createDiscord, createSearchBar, Hamburger } = require("./lib/ui");
const { urls } = require("./lib/urls");

Hamburger();
createSearchBar(urls.search);

(async function () {
  const mangaId = getParams(2); //e06asdfe116-48-b31-kjadsfjsdafj
  createDiscord(mangaId);

  let chapterIndex = parseInt(getParams()); // 1
  var chapterList = JSON.parse(localStorage.getItem(mangaId));

  if (chapterList === null) {
    const response = await fetch(`${urls.chapter}/${mangaId}`, {
      method: "get",
    });
    const chapters = await response.json();
    localStorage.setItem(mangaId, JSON.stringify(chapters));
    chapterList = chapters;
  }

  const chapter = chapterList[chapterIndex];

  chapterIndex = defaultTo(chapterIndex, 0);

  $(".chapter_name").text(chapter.title);

  //Next logic
  if (chapterIndex === 0) {
    $(".back").text("");
  }
  $(".next").on("click", function () {
    const link = `${urls.base}/chapter/${mangaId}/${++chapterIndex}`;
    // Creating Continue Reading JSON object
    setContinueReading({ link, mangaId });
    window.location.href = link;
  });

  // Back logic
  if (chapterIndex === chapterList.length - 1) {
    $(".next").text("");
  }
  $(".back").on("click", function () {
    const link = `${urls.base}/chapter/${mangaId}/${--chapterIndex}`;
    // Creating Continue Reading JSON object
    setContinueReading({ link, mangaId });
    window.location.href = link;
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
})();
