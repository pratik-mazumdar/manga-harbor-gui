const { $, urls, createCard, searchBar, defaultTo } = require("./lib");

searchBar();
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

  mangaList.forEach((eachCard) => {
    const cardElement = createCard(eachCard);
    $("#cards").append(cardElement);
  });
})();
