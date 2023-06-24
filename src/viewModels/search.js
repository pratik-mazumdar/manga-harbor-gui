const { createCard, __ } = require("lib");

// Handle search bar
__("searchForm").onsubmit = async function (e) {
  e.preventDefault();
  window.location = `${config.baseUrl}/search?p=1&s=${__("search").value}`;
};
(async () => {
  let params = new URLSearchParams(location.search);
  let page = params.get("p");
  let search = params.get("s");
  if (page === null) page = 1;
  else if (page !== "1") {
    document.getElementById("back").classList.remove("hidden");
    document.getElementById("back").href = `${
      config.baseUrl
    }/search?s=${search}&p=${page - 1}`;
  }
  document.getElementById("next").href = `${
    config.baseUrl
  }/search?s=${search}&p=${parseInt(page) + 1}`;
  let response = await fetch(
    `${config.baseUrl}/api/v1/search?s=${search}&p=${page}`,
    {
      method: "get",
    }
  );
  let mangaList = (await response.json()).mangaList;
  mangaList.forEach((eachCard) => {
    cards.innerHTML += createCard({
      id: eachCard.id,
      title: eachCard.title,
      link: eachCard.link,
      status: eachCard.status,
      lastUpdated: eachCard.last_updated,
      genre: eachCard.genre,
      author: eachCard.author,
      thumbnail: eachCard.thumbnail,
    });
  });
})();
