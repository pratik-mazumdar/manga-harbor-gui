const { $ } = require("./index");
const { urls } = require("./urls");
const _ = require("lodash");

function redirectManga(id) {
  location.href = `${urls.base}/manga/${id}`;
}

function Hamburger() {
  $(".close-side-nav").on("click", () => {
    $(".mobile-nav").addClass("hidden");
  });
  $(".hamburger").on("click", () => {
    console.log(":test");
    $(".mobile-nav").removeClass("hidden");
  });
}

function createSearchBar(searchUrl) {
  $("#searchForm").on("submit", async (e) => {
    e.preventDefault();
    const searchValue = $("#search").val();
    window.location = `${searchUrl}?p=1&s=${encodeURIComponent(searchValue)}`;
  });
}

function createDiscord(mangaId) {
  // eslint-disable-next-line no-unused-vars
  const disqus_config = function () {
    this.page.url = window.location.href;
    this.page.identifier = mangaId;
  };

  // DON'T EDIT BELOW THIS LINE
  var d = document,
    s = d.createElement("script");
  s.src = "https://mangaharbor-net.disqus.com/embed.js";
  s.setAttribute("data-timestamp", +new Date());
  (d.head || d.body).appendChild(s);
}

function VerboseCard(params) {
  const card = $("<div>").addClass("h-48 cursor-pointer");
  card.on("click", () => redirectManga(params.id));

  const innerContainer = $("<div>").addClass(
    "w-full h-full bg-base-100 grid grid-cols-3 rounded-lg"
  );
  card.append(innerContainer);

  const image = $("<img>").addClass("h-48 pr-2");
  image.attr("src", params.thumbnail);
  image.attr("loading", "lazy");
  innerContainer.append(image);

  const detailsContainer = $("<div>").addClass(
    "col-span-2 overflow-y-auto scrollbar flex justify-center flex-col font-sans"
  );
  innerContainer.append(detailsContainer);

  // Incase of title's length being above 51 chars
  params.title =
    params.title.length > 51
      ? `${params.title.substring(0, 48)}...`
      : params.title;

  const title = $("<div>").addClass("text-center font-bold").text(params.title);
  detailsContainer.append(title);
  const chapters = $("<div>").addClass("p-2");
  _.forEach(params.chapters, (genreText, index) => {
    if (index >= 3) return;
    if (genreText.length > 20) {
      genreText = _.take(genreText, 20).join("");
    }
    const badge = $("<div>")
      .addClass("badge badge-custom w-full font-bold")
      .text(genreText);
    chapters.append(badge);
  });
  chapters.append(
    $("<button>").addClass(
      "btn btn-sm w-2/3 m-2 float-right bg-black hover:bg-gray-500 hover:text-black"
    )
      .html(`<svg class="fill-white" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        d="M528.3 46.5H388.5c-48.1 0-89.9 33.3-100.4 80.3-10.6-47-52.3-80.3-100.4-80.3H48c-26.5 0-48 21.5-48 48v245.8c0 26.5 21.5 48 48 48h89.7c102.2 0 132.7 24.4 147.3 75 .7 2.8 5.2 2.8 6 0 14.7-50.6 45.2-75 147.3-75H528c26.5 0 48-21.5 48-48V94.6c0-26.4-21.3-47.9-47.7-48.1zM242 311.9c0 1.9-1.5 3.5-3.5 3.5H78.2c-1.9 0-3.5-1.5-3.5-3.5V289c0-1.9 1.5-3.5 3.5-3.5h160.4c1.9 0 3.5 1.5 3.5 3.5v22.9zm0-60.9c0 1.9-1.5 3.5-3.5 3.5H78.2c-1.9 0-3.5-1.5-3.5-3.5v-22.9c0-1.9 1.5-3.5 3.5-3.5h160.4c1.9 0 3.5 1.5 3.5 3.5V251zm0-60.9c0 1.9-1.5 3.5-3.5 3.5H78.2c-1.9 0-3.5-1.5-3.5-3.5v-22.9c0-1.9 1.5-3.5 3.5-3.5h160.4c1.9 0 3.5 1.5 3.5 3.5v22.9zm259.3 121.7c0 1.9-1.5 3.5-3.5 3.5H337.5c-1.9 0-3.5-1.5-3.5-3.5v-22.9c0-1.9 1.5-3.5 3.5-3.5h160.4c1.9 0 3.5 1.5 3.5 3.5v22.9zm0-60.9c0 1.9-1.5 3.5-3.5 3.5H337.5c-1.9 0-3.5-1.5-3.5-3.5V228c0-1.9 1.5-3.5 3.5-3.5h160.4c1.9 0 3.5 1.5 3.5 3.5v22.9zm0-60.9c0 1.9-1.5 3.5-3.5 3.5H337.5c-1.9 0-3.5-1.5-3.5-3.5v-22.8c0-1.9 1.5-3.5 3.5-3.5h160.4c1.9 0 3.5 1.5 3.5 3.5V190z"
      />
    </svg>Read`)
  );
  detailsContainer.append(chapters);

  return card.get(0);
}

function Card(params, currentChapter) {
  const card = $("<div>").addClass(
    "card m-2 p-2 w-48 min-w-48 bg-base-100 shadow-xl cursor-pointer"
  );
  if (params.manga) {
    card.on("click", () => {
      location.href = `${urls.base}/manga/${params.id}`;
    });
  } else if (params.chapter) {
    card.on("click", () => {
      location.href = `${urls.base}/chapter/${params.id}/${currentChapter}`;
    });
  }
  if (params.custom === true) {
    card.on("click", () => {
      location.href = params.link;
    });
  }
  const figure = $("<figure>");
  const img = $("<img>")
    .addClass("h-64 w-full")
    .attr("src", params.thumbnail)
    .attr("alt", params.title);
  figure.append(img);
  card.append(figure);
  const cardBody = $("<div>").addClass("card-body p-2");
  const paragraph = $("<p>")
    .addClass("card-text flex justify-center font-bold")
    .text(params.title);
  cardBody.append(paragraph);
  card.append(cardBody);

  return card;
}
module.exports = {
  Card,
  Hamburger,
  VerboseCard,
  createDiscord,
  createSearchBar,
};
