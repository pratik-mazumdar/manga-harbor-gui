const { $, urls, createCard, searchBar } = require("./lib");

searchBar();
(async () => {
  // Load mangas from the API
  const params = new URLSearchParams(location.search);
  const page = parseInt(params.get("page")) || 0;
  const nextPageLink = $(".next");
  const previousPageLink = $(".back");
  if (page !== 0) {
    previousPageLink.each((backButton) => {
      $(backButton).removeClass("hidden");
      $(backButton).attr("href", `${urls.home}?page=${page - 1}`);
    });
  }
  nextPageLink.each((nextButton) => {
    $(nextButton).attr("href", `${urls.home}?page=${page + 1}`);
  });

  const response = await fetch(`${urls.api}/page/${page}`);
  const { mangaList } = await response.json();

  const cardsContainer = $("#cards");
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
    cardsContainer.append(cardElement);
  });
})();
