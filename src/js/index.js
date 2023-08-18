const { $, transformDate, getContinueReading } = require("./lib");
const { urls } = require("./lib/urls");
const { createSearchBar, Card, VerboseCard, Hamburger } = require("./lib/ui");
const _ = require("lodash");

Hamburger();
createSearchBar(urls.search);
$(".next").attr("href", `${urls.search}?s=&p=1`);

(async () => {
  /* Load Popular Manga Panel
  ========================= */
  let response = await fetch(`${urls.api}/search?p=1&s=`);
  const { mangas } = await response.json();

  $(".loading").detach();

  _.dropRight(mangas, 8).forEach((eachCard) => {
    $("#cards").append(Card({ ...eachCard, manga: true }));
  });
})();

/**Load Latest Panel
 * ================= */
(async () => {
  let response = await fetch(`${urls.api}/latest-manga/1`);
  response = await response.json();

  _.dropRight(response.mangas, 9).forEach((details) => {
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

/* Load Genre Panel
  ========================= */
(async () => {
  const genres = {
    action: {
      thumbnail: "https://avt.mkklcdnv6temp.com/3/u/1-1583463814.jpg",
      title: "Action",
    },
    comedy: {
      thumbnail: "https://avt.mkklcdnv6temp.com/43/d/3-1583469370.jpg",
      title: "Comedy",
    },
    shounen: {
      thumbnail: "https://avt.mkklcdnv6temp.com/18/f/1-1583464405.jpg",
      title: "Shounen",
    },
    school: {
      thumbnail: "https://avt.mkklcdnv6temp.com/31/n/6-1583475402.jpg",
      title: "School",
    },
    sports: {
      thumbnail: "https://avt.mkklcdnv6temp.com/2/n/1-1583463761.jpg",
      title: "Sports",
    },
    josei: {
      thumbnail: "https://avt.mkklcdnv6temp.com/10/h/6-1583474522.jpg",
      title: "Josei",
    },
    romance: {
      thumbnail: "https://avt.mkklcdnv6temp.com/15/d/1-1583464266.jpg",
      title: "Romance",
    },
    webtoons: {
      thumbnail: "https://avt.mkklcdnv6temp.com/19/x/1-1583464480.jpg",
      title: "Webtoons",
    },
    martial: {
      thumbnail: "https://avt.mkklcdnv6temp.com/25/z/3-1583468698.jpg",
      title: "Martial Arts",
    },
    drama: {
      thumbnail: "https://avt.mkklcdnv6temp.com/10/g/18-1583497477.jpg",
      title: "Drama",
    },
  };
  _.forEach(genres, (value, key) => {
    $("#genres").append(
      Card({
        thumbnail: value.thumbnail,
        title: value.title,
        link: `${urls.base}/genre/${key}/1`,
        custom: true,
      })
    );
  });
})();
