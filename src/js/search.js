const { $, urls, createCard, searchBar } = require("./lib");

searchBar();

(async () => {
  let params = new URLSearchParams(location.search);
  let page = params.get("p");
  let search = params.get("s");
  if (page === null) page = 1;
  else if (page !== "1") {
    $(".back").each((ele) => {
      $(ele).remove("hidden");
      $(ele).attr("href", `${urls.search}?s=${search}&p=${page - 1}`);
    });
  }
  $(".next").each((ele) => {
    $(ele).attr("href", `${urls.search}?s=${search}&p=${parseInt(page) + 1}`);
  });
  let response = await fetch(`${urls.api}/search?s=${search}&p=${page}`, {
    method: "get",
  });
  let mangaList = (await response.json()).mangaList;
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
