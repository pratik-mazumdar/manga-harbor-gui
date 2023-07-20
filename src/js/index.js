const { $, searchBar, defaultTo } = require("./lib");
const { urls } = require("./lib/urls");
const { createCard, continueCard } = require("./lib/ui");

searchBar(urls.search);
continueCard();
(async () => {
  let page = new URLSearchParams(location.search).get("page");
  page = defaultTo(parseInt(page), 0);

  if (page !== 0) {
    $(".back").attr("href", `${urls.home}?page=${page - 1}`);
    $(".back").removeClass("hidden");
  }
  $(".next").attr("href", `${urls.home}?page=${page + 1}`);

  // Load mangas from the API
  const response = await fetch(`${urls.api}/page/${page}`);
  const { mangaList } = await response.json();

  if (mangaList) {
    $(".loading").detach();
  }
  mangaList.forEach((eachCard) => {
    const cardElement = createCard(eachCard);
    $("#cards").append(cardElement);
  });
})();
