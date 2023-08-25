const { $, getParams, defaultTo, setContinueReading } = require("./lib");
const { createDiscord, createSearchBar, Hamburger } = require("./lib/ui");
const { urls } = require("./lib/urls");

Hamburger();
createSearchBar(urls.search);

(async function () {
  const mangaId = getParams(2); //e06asdfe116-48-b31-kjadsfjsdafj
  createDiscord(mangaId);

  let chapterIndex = parseInt(getParams()); // 1
  let localChapters = JSON.parse(localStorage.getItem(mangaId));

  // If local storage is empty fetch it from the server
  if (localChapters === null) {
    const response = await fetch(`${urls.chapter}/${mangaId}`, {
      method: "get",
    });
    const chapters = await response.json();
    localStorage.setItem(mangaId, JSON.stringify(chapters));
    localChapters = chapters;
  }

  let ul_li_list = "";
  localChapters.forEach((chapter) => {
    ul_li_list += `<li><a href="">${chapter.title}</a></li>`;
  });
  $(".menu").html(ul_li_list);
  const chapter = localChapters[chapterIndex];

  $(".dropdown-title").html(`${chapter.title}
    <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
    </svg>`);

  chapterIndex = defaultTo(chapterIndex, 0);

  //Next logic
  if (chapterIndex === 0) {
    $(".back").addClass("hidden");
  }
  $(".next").on("click", function () {
    const link = `${urls.base}/chapter/${mangaId}/${++chapterIndex}`;
    // Creating Continue Reading JSON object
    setContinueReading({ link, mangaId });
    window.location.href = link;
  });

  // Back logic
  if (chapterIndex === localChapters.length - 1) {
    $(".next").addClass("hidden");
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
