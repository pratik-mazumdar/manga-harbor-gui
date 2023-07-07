const { __, urls, createCard, searchBar } = require("./lib");

searchBar();

(async () => {
  let params = new URLSearchParams(location.search);
  let page = params.get("p");
  let search = params.get("s");
  if (page === null) page = 1;
  else if (page !== "1") {
    document.querySelectorAll(".back").forEach((ele) => {
      ele.classList.remove("hidden");
      ele.href = `${urls.search}?s=${search}&p=${page - 1}`;
    });
  }
  document.querySelectorAll(".next").forEach((ele) => {
    ele.href = `${urls.search}?s=${search}&p=${parseInt(page) + 1}`;
  });
  let response = await fetch(`${urls.api}/search?s=${search}&p=${page}`, {
    method: "get",
  });
  let mangaList = (await response.json()).mangaList;
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
