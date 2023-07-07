const { config } = require("./config");
const $ = require("cash-dom");

const urls = {
  base: config.baseUrl,
  api: config.apiUrl,
  search: `${config.baseUrl}/search`,
  home: `${config.baseUrl}/home`,
  manga: `${config.apiUrl}/manga`,
  chapter: `${config.apiUrl}/chapter`,
  images: `${config.apiUrl}/images`,
  image: `${config.apiUrl}/image`,
};

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

function getParams(slice = 1) {
  const parts = window.location.href.split("/");
  return parts[parts.length - slice];
}

function redirectManga(id) {
  location.href = `manga?id=${id}`;
}

function searchBar() {
  $("#searchForm").on("submit", async (e) => {
    e.preventDefault();
    const searchValue = $("#search").val();
    window.location = `${urls.search}?p=1&s=${encodeURIComponent(searchValue)}`;
  });
}

function transformDate(date) {
  const dateObj = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(dateObj);
  return formattedDate;
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

  const detailsContainer = $("<div>");
  innerContainer.append(detailsContainer);

  const title = $("<div>").addClass("flex mb-3 font-sans font-bold pt-3 pb-2");
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

module.exports = {
  urls,
  $,
  createDiscord,
  searchBar,
  getParams,
  createCard,
  transformDate,
};
