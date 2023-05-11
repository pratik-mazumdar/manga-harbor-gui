function card(params) {
  return `
    <div class="h-64 cursor-pointer" onclick = redirect('${params.id}')>
    <div class="w-full h-full bg-gray-700 grid grid-cols-2 rounded-lg p-2">
        <img
        loading="lazy"
        class="h-full"
        src="${params.thumbnail}"
        />
        <div>
        <div class="flex mb-3">
            <span id="cardTitle" class="font-sans font-semibold">
            ${params.title}
            </span>
        </div>
        <div class="flex  text-sm">
            <span>Status:&nbsp;</span>
            <span id="status">
            ${params.status}
            </span>
        </div>
        <div class="flex  text-sm">
            <span>Author:&nbsp; </span>
            <span class="text-xs" id="author" >
             ${params.author}
            </span>
        </div>
        <div class="flex  text-sm">
            <span id="genre">Genre:&nbsp; </span>
            <span class="text-xs">  ${params.genre}</span>
        </div>
        <div class="flex  text-sm">
            <span>Last Updated:&nbsp;</span>
            <span id="updated" >
             ${params.lastUpdated}
            </span>
        </div>
        </div>
    </div>
    </div>`;
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
  // Load mangas from the api
  let params = new URLSearchParams(location.search);
  let page = params.get("page");
  if (page === null) page = 0;
  else if (page !== "0") {
    document.getElementById("back").classList.remove("hidden");
    document.getElementById("back").href = `${config.baseUrl}?page=${page - 1}`;
  }
  document.getElementById("next").href = `${config.baseUrl}?page=${
    parseInt(page) + 1
  }`;
  let response = await fetch(`${config.baseUrl}/api/v1/n_manga?page=${page}`, {
    method: "get",
  });
  let mangaList = (await response.json()).mangaList;
  mangaList.forEach((eachCard) => {
    cards.innerHTML += card({
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
