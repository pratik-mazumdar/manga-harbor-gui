function createCard(params) {
  const card = document.createElement("div");
  card.className = "h-64 cursor-pointer";
  card.addEventListener("click", () => redirect(params.id));

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

function redirect(id) {
  location.href = `manga?id=${id}`;
}

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
    document.querySelectorAll(".back").forEach((ele) => {
      ele.classList.remove("hidden");
      ele.href = `${config.baseUrl}/search?s=${search}&p=${page - 1}`;
    });
  }
  document.querySelectorAll(".next").forEach((ele) => {
    ele.href = `${config.baseUrl}/search?s=${search}&p=${parseInt(page) + 1}`;
  });
  let response = await fetch(
    `${config.baseUrl}/api/v1/search?s=${search}&p=${page}`,
    {
      method: "get",
    }
  );
  let mangaList = (await response.json()).mangaList;
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
