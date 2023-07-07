const { config } = require("./config");
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
function __(id) {
  return document.getElementById(id);
}
function getParams(slice = 1) {
  let parts = window.location.href.split("/");
  return parts[parts.length - slice];
}

function redirectManga(id) {
  location.href = `manga?id=${id}`;
}

function searchBar() {
  const searchForm = __("searchForm");
  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchValue = __("search").value;
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
  const card = document.createElement("div");
  card.className = "h-64 cursor-pointer";
  card.addEventListener("click", () => redirectManga(params.id));

  const innerContainer = document.createElement("div");
  innerContainer.className =
    "w-full h-full bg-gray-700 grid grid-cols-2 rounded-lg";
  card.appendChild(innerContainer);

  const image = document.createElement("img");
  image.className = "h-64 p-2 ";
  image.src = params.thumbnail;
  image.loading = "lazy";
  innerContainer.appendChild(image);

  const detailsContainer = document.createElement("div");
  innerContainer.appendChild(detailsContainer);

  const title = document.createElement("div");
  title.className = "flex mb-3 font-sans font-bold pt-3 pb-2";
  title.textContent = params.title;
  detailsContainer.appendChild(title);

  const status = document.createElement("div");
  status.className = "flex ";
  status.innerHTML = `<span class="text-xs font-semibold mb-2">Status: ${params.status}</span>`;
  detailsContainer.appendChild(status);

  const author = document.createElement("div");
  author.className = "flex ";
  author.innerHTML = `<span class="text-xs font-semibold mb-2">Author: ${params.author}</span>`;
  detailsContainer.appendChild(author);

  const genre = document.createElement("div");
  genre.className = "flex text-sm";
  genre.innerHTML = `<span class="text-xs font-semibold mb-2"> Genre: ${params.genre}</span>`;
  detailsContainer.appendChild(genre);

  const lastUpdated = document.createElement("div");
  lastUpdated.className = "flex text-sm";
  lastUpdated.innerHTML = `<span class="text-xs font-semibold mb-2">Last Updated: ${transformDate(
    params.lastUpdated
  )}</span>`;
  detailsContainer.appendChild(lastUpdated);

  return card;
}

module.exports = { urls, __, searchBar, getParams, createCard, transformDate };
