if (process.env.ENVIOURMENT === "development") {
  baseUrl = process.env.DEV_BASE_URL;
  apiUrl = `${process.env.DEV_BASE_URL}/api/v1/`;
} else if (process.env.ENVIOURMENT === "production") {
  baseUrl = process.env.PRODUCTION_BASE_URL;
  apiUrl = `${process.env.PRODUCTION_BASE_URL}/api/v1`;
} else if (process.env.ENVIOURMENT === "testing") {
  baseUrl = process.env.TESTING_BASE_URL;
  apiUrl = `${process.env.PRODUCTION_BASE_URL}/api/v1`;
}

const transformDate = function (date) {
  const dateObj = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(dateObj);
  return formattedDate;
};

const redirectManga = function (id) {
  location.href = `manga?id=${id}`;
};

module.exports.transformDate = transformDate;
module.exports.redirectManga = redirectManga;

module.exports.config = {
  baseUrl: baseUrl,
  apiUrl: apiUrl,
};

module.exports.__ = function (id) {
  return document.getElementById(id);
};

module.exports.getPara = function () {
  let parts = window.location.href.split("/");
  return parts[parts.length - 1];
};

module.exports.createCard = function (params) {
  const card = document.createElement("div");
  card.className = "h-64 cursor-pointer";
  card.addEventListener("click", () => redirectManga(params.id));

  const innerContainer = document.createElement("div");
  innerContainer.className =
    "w-full h-full bg-gray-700 grid grid-cols-2 rounded-lg";
  card.appendChild(innerContainer);

  const image = document.createElement("img");
  image.className = "h-64 p-2";
  image.src = params.thumbnail;
  image.loading = "lazy";
  innerContainer.appendChild(image);

  const detailsContainer = document.createElement("div");
  innerContainer.appendChild(detailsContainer);

  const title = document.createElement("div");
  title.className = "flex mb-3 font-sans font-semibold";
  title.textContent = params.title;
  detailsContainer.appendChild(title);

  const status = document.createElement("div");
  status.className = "flex text-sm";
  status.textContent = `Status: ${params.status}`;
  detailsContainer.appendChild(status);

  const author = document.createElement("div");
  author.className = "flex text-sm";
  author.innerHTML = `Author: <span class="text-xs">${params.author}</span>`;
  detailsContainer.appendChild(author);

  const genre = document.createElement("div");
  genre.className = "flex text-sm";
  genre.innerHTML = `Genre: <span class="text-xs">${params.genre}</span>`;
  detailsContainer.appendChild(genre);

  const lastUpdated = document.createElement("div");
  lastUpdated.className = "flex text-sm";
  lastUpdated.textContent = `Last Updated: ${transformDate(
    params.lastUpdated
  )}`;
  detailsContainer.appendChild(lastUpdated);

  return card;
};
