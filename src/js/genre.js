const { $, transformDate, defaultTo, getParams } = require("./lib");
const { urls } = require("./lib/urls");
const { createSearchBar, VerboseCard } = require("./lib/ui");

(async () => {
  let page = getParams();
  page = defaultTo(parseInt(page), 1);
  const genre = getParams(2);
  createSearchBar(urls.search);

  let response = await fetch(`${urls.api}/genre/${genre}/${page}`);
  response = await response.json();

  if (response.back) {
    $(".back").attr("href", `${urls.base}/genre/${genre}/${page - 1}`);
    $(".back").removeClass("hidden");
  }
  if (response.next) {
    $(".next").attr("href", `${urls.base}/genre/${genre}/${page + 1}`);
    $(".next").removeClass("hidden");
  }

  response.mangas.forEach((eachCard) => {
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
