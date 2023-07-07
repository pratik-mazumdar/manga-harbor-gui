const { $, urls, createCard, searchBar } = require("./lib");
const { defaultTo } = require("lodash.defaultto");

(async () => {
  let params = new URLSearchParams(location.search);
  let page = parseInt(params.get("p"));
  let search = params.get("s");
  page = defaultTo(page, 1);
  search = defaultTo(search, "");

  searchBar();

  if (page !== 1) {
    $(".back").remove("hidden");
    $(".back").attr("href", `${urls.search}?s=${search}&p=${page - 1}`);
  }
  $(".next").attr("href", `${urls.search}?s=${search}&p=${page + 1}`);

  let response = await fetch(`${urls.api}/search?s=${search}&p=${page}`, {
    method: "get",
  });
  let mangaList = (await response.json()).mangaList;
  mangaList.forEach((eachCard) => {
    const cardElement = createCard(eachCard);
    $("#cards").append(cardElement);
  });
})();
