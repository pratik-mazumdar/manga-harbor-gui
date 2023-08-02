const { $, transformDate, defaultTo } = require("./lib");
const { urls } = require("./lib/urls");
const { createSearchBar, VerboseCard } = require("./lib/ui");

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
  let { mangaList } = await response.json();
  mangaList.forEach((eachCard) => {
    $("#cards").append(
      VerboseCard({
        id: eachCard.id,
        thumbnail: eachCard.thumbnail,
        title: eachCard.title,
        chapters: [
          eachCard.author,
          transformDate(eachCard.last_updated),
          eachCard.status,
        ],
      })
    );
  });
})();
