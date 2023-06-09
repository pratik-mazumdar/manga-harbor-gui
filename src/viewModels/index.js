function createCard(params) {
  const card = document.createElement("div");
  card.className = "h-64 cursor-pointer";
  card.addEventListener("click", () => redirect(params.id));

  const innerContainer = document.createElement("div");
  innerContainer.className =
    "w-full h-full bg-gray-700 grid grid-cols-2 rounded-lg p-2";
  card.appendChild(innerContainer);

  const image = document.createElement("img");
  image.className = "h-full";
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
}

function redirect(id) {
  location.href = `manga?id=${id}`;
}

const searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchValue = document.querySelector("#search").value;
  window.location = `${config.baseUrl}/search?p=1&s=${encodeURIComponent(
    searchValue
  )}`;
});

(async () => {
  // Load mangas from the API
  const params = new URLSearchParams(location.search);
  const page = parseInt(params.get("page")) || 0;
  const nextPageLink = document.getElementById("next");
  const previousPageLink = document.getElementById("back");
  if (page !== 0) {
    previousPageLink.classList.remove("hidden");
    previousPageLink.href = `${config.baseUrl}?page=${page - 1}`;
  }
  nextPageLink.href = `${config.baseUrl}?page=${page + 1}`;

  const response = await fetch(`${config.baseUrl}/api/v1/page/${page}`);
  const { mangaList } = await response.json();

  const cardsContainer = document.getElementById("cards");
  mangaList.forEach((eachCard) => {
    const cardElement = createCard({
      id: eachCard.id,
      title: eachCard.title,
      link: eachCard.link,
      status: eachCard.status,
      lastUpdated: eachCard.last_updated,
      genre: eachCard.genre,
      author: eachCard.author,
      thumbnail: eachCard.thumbnail,
    });
    cardsContainer.appendChild(cardElement);
  });
})();
