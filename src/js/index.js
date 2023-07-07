const { __, urls, createCard, searchBar } = require("./lib");

searchBar();
(async () => {
  // Load mangas from the API
  const params = new URLSearchParams(location.search);
  const page = parseInt(params.get("page")) || 0;
  const nextPageLink = document.querySelectorAll(".next");
  const previousPageLink = document.querySelectorAll(".back");
  if (page !== 0) {
    previousPageLink.forEach((backButton) => {
      backButton.classList.remove("hidden");
      backButton.href = `${urls.home}?page=${page - 1}`;
    });
  }
  nextPageLink.forEach((nextButton) => {
    nextButton.href = `${urls.home}?page=${page + 1}`;
  });

  const response = await fetch(`${urls.api}/page/${page}`);
  const { mangaList } = await response.json();

  const cardsContainer = __("cards");
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
