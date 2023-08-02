const { $, transformDate, getContinueReading } = require("./lib");
const { urls } = require("./lib/urls");
const { createSearchBar, Card, VerboseCard } = require("./lib/ui");

createSearchBar(urls.search);
$(".next").attr("href", `${urls.search}?s=&p=2`);

(async () => {
  /* Load Popular Manga Panel
  ========================= */
  let response = await fetch(`${urls.api}/search?p=1&s=`);
  const { mangaList } = await response.json();

  $(".loading").detach();
  mangaList.forEach((eachCard) => {
    $("#cards").append(Card({ ...eachCard, manga: true }));
  });
})();

/**Load Latest Panel
 * ================= */
(async () => {
  let response = await fetch(`${urls.api}/latest-manga`);
  response = await response.json();

  response.forEach((details) => {
    $(".latest-manga").append(
      VerboseCard({
        id: details.id,
        thumbnail: details.thumbnail,
        title: details.title,
        chapters: [
          details.author,
          transformDate(details.last_updated),
          details.status,
        ],
      })
    );
  });
})();

(async () => {
  /* Load Continue Reading Panel
  ========================= */
  const continueReading = getContinueReading();

  if (continueReading === null) return;

  $(".continue-header").removeClass("hidden");
  let response = await fetch(
    `${urls.api}/mangas/${continueReading.ids.join(";")}`
  );
  response = await response.json();
  response.forEach((cardDetails, index) => {
    const ele = Card(
      { ...cardDetails, chapter: true },
      continueReading.chapterId[index]
    );
    $(".continue-panel").append(ele);
  });
})();
