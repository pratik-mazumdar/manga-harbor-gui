const { transformDate, $ } = require("./index");
const { urls } = require("./urls");

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

function createCard(params) {
  const card = $("<div>").addClass("h-64 cursor-pointer");
  card.on("click", () => redirectManga(params.id));

  const innerContainer = $("<div>").addClass(
    "w-full h-full bg-gray-700 grid grid-cols-2 rounded-lg"
  );
  card.append(innerContainer);

  const image = $("<img>").addClass("h-64 p-2");
  image.attr("src", params.thumbnail);
  image.attr("loading", "lazy");
  innerContainer.append(image);

  const detailsContainer = $("<div>").addClass("p-2 overflow-y-auto");
  innerContainer.append(detailsContainer);

  const title = $("<div>").addClass("flex mb-3 font-sans font-bold");
  title.text(params.title);
  detailsContainer.append(title);

  const status = $("<div>").addClass("flex");
  status.html(
    `<span class="text-xs font-semibold mb-2">Status: ${params.status}</span>`
  );
  detailsContainer.append(status);

  const author = $("<div>").addClass("flex");
  author.html(
    `<span class="text-xs font-semibold mb-2">Author: ${params.author}</span>`
  );
  detailsContainer.append(author);

  const genre = $("<div>").addClass("flex text-sm");
  genre.html(
    `<span class="text-xs font-semibold mb-2">Genre: ${params.genre}</span>`
  );
  detailsContainer.append(genre);

  const lastUpdated = $("<div>").addClass("flex text-sm");
  lastUpdated.html(
    `<span class="text-xs font-semibold mb-2">Last Updated: ${transformDate(
      params.last_updated
    )}</span>`
  );
  detailsContainer.append(lastUpdated);

  return card.get(0);
}

function verticalCard(params, currentChapter) {
  const card = $("<div>").addClass(
    "card m-2 w-48 min-w-48 bg-base-100 shadow-xl cursor-pointer"
  );
  card.on("click", () => {
    location.href = `${urls.base}/chapter/${params.id}/${currentChapter}`;
  });
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
module.exports = { createCard, verticalCard, createDiscord, createSearchBar };
