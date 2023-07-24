const { $, defaultTo, getContinueReading } = require("./lib");
const { urls } = require("./lib/urls");
const ui = require("./lib/ui");

ui.createSearchBar(urls.search);

(async () => {
  let page = new URLSearchParams(location.search).get("page");
  page = defaultTo(parseInt(page), 1);

  if (page !== 1) {
    $(".back").attr("href", `${urls.search}?s=&p=${page - 1}`);
    $(".back").removeClass("hidden");
  }
  $(".next").attr("href", `${urls.search}?s=&p=${page + 1}`);

  /* Load Popular Manga Panel
  ========================= */
  let response = await fetch(`${urls.api}/search?p=${page}&s=`);
  const { mangaList } = await response.json();

  if (mangaList) {
    $(".loading").detach();
  }
  mangaList.forEach((eachCard) => {
    const cardElement = ui.createCard(eachCard);
    $("#cards").append(cardElement);
  });

  /* Load Continue Reading Panel
  ========================= */
  // Even though this is a post method we are still getting value
  const continueReading = getContinueReading();
  if (continueReading !== null) {
    $(".continue-header").removeClass("hidden");
  }
  response = await fetch(`${urls.api}/mangas/${continueReading.ids.join(";")}`);
  response = await response.json();
  response.forEach((cardDetails, index) => {
    const ele = ui.verticalCard(cardDetails, continueReading.chapterId[index]);
    $(".continue-panel").append(ele);
  });
})();
