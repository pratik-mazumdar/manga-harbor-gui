const { transformDate, $ } = require("./index");
const { urls } = require("./urls");

function redirectManga(id) {
  location.href = `${urls.base}/manga/${id}`;
}

function createCard(params) {
  const card = $("<div>").addClass("h-64 cursor-pointer");
  card.on("click", () => redirectManga(params.id));

  const innerContainer = $("<div>").addClass(
    "w-full h-full bg-gray-700 grid grid-cols-2 rounded-lg"
  );
  card.append(innerContainer);

  const image = $("<img>").addClass("h-64 p-2");
  image.attr("src", params.thumbnail);
  image.attr("loading", "lazy");
  innerContainer.append(image);

  const detailsContainer = $("<div>").addClass("p-2 overflow-y-auto");
  innerContainer.append(detailsContainer);

  const title = $("<div>").addClass("flex mb-3 font-sans font-bold");
  title.text(params.title);
  detailsContainer.append(title);

  const status = $("<div>").addClass("flex");
  status.html(
    `<span class="text-xs font-semibold mb-2">Status: ${params.status}</span>`
  );
  detailsContainer.append(status);

  const author = $("<div>").addClass("flex");
  author.html(
    `<span class="text-xs font-semibold mb-2">Author: ${params.author}</span>`
  );
  detailsContainer.append(author);

  const genre = $("<div>").addClass("flex text-sm");
  genre.html(
    `<span class="text-xs font-semibold mb-2">Genre: ${params.genre}</span>`
  );
  detailsContainer.append(genre);

  const lastUpdated = $("<div>").addClass("flex text-sm");
  lastUpdated.html(
    `<span class="text-xs font-semibold mb-2">Last Updated: ${transformDate(
      params.last_updated
    )}</span>`
  );
  detailsContainer.append(lastUpdated);

  return card.get(0);
}
function continueCard() {
  const card = $("<div>").addClass(
    "card m-2 w-48 min-w-48 bg-base-100 shadow-xl"
  );
  const figure = $("<figure>");
  const img = $("<img>")
    .attr("src", "https://avt.mkklcdnv6temp.com/32/i/14-1583490877.jpg")
    .attr("alt", "Shoes");
  figure.append(img);
  card.append(figure);
  const cardBody = $("<div>").addClass("card-body p-2");
  const paragraph = $("<p>")
    .addClass("card-text")
    .text("If a dog chews shoes, whose shoes does he choose?");
  cardBody.append(paragraph);
  card.append(cardBody);

  // Append the card element to the document body
  $(".continue-panel").append(card);
}
module.exports = { createCard, continueCard };
