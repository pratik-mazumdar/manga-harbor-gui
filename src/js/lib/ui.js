const { $ } = require("./index");
const { urls } = require("./urls");
const _ = require("lodash");

function redirectManga(id) {
  location.href = `${urls.base}/manga/${id}`;
}

function createSearchBar(searchUrl) {
  $("#searchForm").on("submit", async (e) => {
    e.preventDefault();
    const searchValue = $("#search").val();
    window.location = `${searchUrl}?p=1&s=${encodeURIComponent(searchValue)}`;
  });
}

function createDiscord(mangaId) {
  // eslint-disable-next-line no-unused-vars
  const disqus_config = function () {
    this.page.url = window.location.href;
    this.page.identifier = mangaId;
  };

  // DON'T EDIT BELOW THIS LINE
  var d = document,
    s = d.createElement("script");
  s.src = "https://mangaharbor-net.disqus.com/embed.js";
  s.setAttribute("data-timestamp", +new Date());
  (d.head || d.body).appendChild(s);
}

function VerboseCard(params) {
  const card = $("<div>").addClass("h-48 cursor-pointer");
  card.on("click", () => redirectManga(params.id));

  const innerContainer = $("<div>").addClass(
    "w-full h-full bg-base-100 grid grid-cols-3 rounded-lg"
  );
  card.append(innerContainer);

  const image = $("<img>").addClass("h-48 pr-2");
  image.attr("src", params.thumbnail);
  image.attr("loading", "lazy");
  innerContainer.append(image);

  const detailsContainer = $("<div>").addClass(
    "col-span-2 overflow-y-auto flex justify-center flex-col font-sans"
  );
  innerContainer.append(detailsContainer);

  const title = $("<div>")
    .addClass("text-center m-2 font-bold")
    .text(params.title);
  detailsContainer.append(title);
  const chapters = $("<div>").addClass("p-2");
  _.forEach(params.chapters, (genreText, index) => {
    if (index >= 3) return;
    if (genreText.length > 20) {
      genreText = _.take(genreText, 20).join("");
    }
    const badge = $("<div>")
      .addClass("badge badge-custom w-full font-bold")
      .text(genreText);
    chapters.append(badge);
  });
  chapters.append(
    $("<button>")
      .addClass(
        "btn btn-sm w-2/3 m-2 float-right bg-black hover:bg-gray-500 hover:text-black"
      )
      .text("Read")
  );
  detailsContainer.append(chapters);

  return card.get(0);
}

function Card(params, currentChapter) {
  const card = $("<div>").addClass(
    "card m-2 p-2 w-48 min-w-48 bg-base-100 shadow-xl cursor-pointer"
  );
  if (params.manga) {
    card.on("click", () => {
      location.href = `${urls.base}/manga/${params.id}`;
    });
  } else if (params.chapter) {
    card.on("click", () => {
      location.href = `${urls.base}/chapter/${params.id}/${currentChapter}`;
    });
  }
  if (params.custom === true) {
    card.on("click", () => {
      location.href = params.link;
    });
  }
  const figure = $("<figure>");
  const img = $("<img>")
    .addClass("h-64 w-full")
    .attr("src", params.thumbnail)
    .attr("alt", params.title);
  figure.append(img);
  card.append(figure);
  const cardBody = $("<div>").addClass("card-body p-2");
  const paragraph = $("<p>")
    .addClass("card-text flex justify-center font-bold")
    .text(params.title);
  cardBody.append(paragraph);
  card.append(cardBody);

  return card;
}
module.exports = {
  Card,
  VerboseCard,
  createDiscord,
  createSearchBar,
};
