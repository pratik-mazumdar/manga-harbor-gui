const { $, defaultTo } = require("./lib");
const { urls } = require("./lib/urls");
const { createCard, createSearchBar } = require("./lib/ui");

(async () => {
  let params = new URLSearchParams(location.search);
  let page = parseInt(params.get("p"));
  let search = params.get("s");
  page = defaultTo(page, 1);
  search = defaultTo(search, "");

  createSearchBar(urls.search);

  if (page !== 1) {
    $(".back").attr("href", `${urls.search}?s=${search}&p=${page - 1}`);
    $(".back").removeClass("hidden");
  }
  $(".next").attr("href", `${urls.search}?s=${search}&p=${page + 1}`);

  let response = await fetch(`${urls.api}/search?s=${search}&p=${page}`);
  let mangaList = (await response.json()).mangaList;
  mangaList.forEach((eachCard) => {
    const cardElement = createCard(eachCard);
    $("#cards").append(cardElement);
  });
})();
