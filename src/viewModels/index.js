const { createCard, config } = require("./lib");

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
