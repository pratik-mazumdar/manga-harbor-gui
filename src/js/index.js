const { $, urls, createCard, searchBar } = require("./lib");
const { defaultTo } = require("lodash.defaultto");

searchBar();
(async () => {
  // Load mangas from the API
  let page = new URLSearchParams(location.search).get("page");
  page = defaultTo(parseInt(page), 0);

  if (page !== 0) {
    $(".back").attr("href", `${urls.home}?page=${page - 1}`);
    $(".back").removeClass("hidden");
  }
  $(".next").attr("href", `${urls.home}?page=${page + 1}`);

  const response = await fetch(`${urls.api}/page/${page}`);
  const { mangaList } = await response.json();

  mangaList.forEach((eachCard) => {
    const cardElement = createCard(eachCard);
    $("#cards").append(cardElement);
  });
})();
