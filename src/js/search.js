const { $, transformDate, defaultTo } = require("./lib");
const { urls } = require("./lib/urls");
const ui = require("./lib/ui");

ui.Hamburger();
ui.createSearchBar(urls.search);

(async () => {
  let params = new URLSearchParams(location.search);
  let page = parseInt(params.get("p"));
  let search = params.get("s");
  page = defaultTo(page, 1);
  search = defaultTo(search, "");

  let response = await fetch(`${urls.api}/search?s=${search}&p=${page}`);
  response = await response.json();

  if (response.back) {
    $(".back").attr("href", `${urls.search}?s=${search}&p=${page - 1}`);
    $(".back").removeClass("hidden");
  }
  if (response.next) {
    $(".next").attr("href", `${urls.search}?s=${search}&p=${page + 1}`);
    $(".next").removeClass("hidden");
  }

  if (!response.mangas) {
    ui.ToastError("No result found!");
    return;
  }
  response.mangas.forEach((eachCard) => {
    $("#cards").append(
      ui.VerboseCard({
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
