const {
  $,
  createDiscord,
  transformDate,
  searchBar,
  getParams,
} = require("./lib");
const { urls } = require("./lib/urls");

(async function () {
  const mangaId = getParams();

  createDiscord(mangaId);
  searchBar(urls.search);

  window.goToChapters = function (link, mangaId) {
    // Saving the chapters list
    localStorage.setItem(mangaId, JSON.stringify(chapters));
    window.location = link;
  };

  // Handle manga infromation
  let response = await fetch(`${urls.manga}/${mangaId}`, {
    method: "get",
  });
  if (response.status === 404) {
    alert("This page doesn't exist");
  }
  if (response.status !== 200 && response.status !== 404) {
    alert("Unknown error");
  }
  let manga_details = (await response.json()).manga;

  $("#title").text(manga_details.title);
  $("#status").text(manga_details.status);
  $("#author").text(manga_details.author);
  $("#last-updated").text(transformDate(manga_details.last_updated));
  $("#genre").text(manga_details.genre);
  $("#summary").text(manga_details.summary);
  $("#thumbnail").attr("src", manga_details.thumbnail);

  // Handle manga chapters
  response = await fetch(`${urls.chapter}/${mangaId}`, {
    method: "get",
  });
  const chapters = await response.json();

  // Will add chapters to the panel
  const elements = chapters
    .map((chapter, index) => {
      const chapterUrl = `${urls.base}/chapter/${mangaId}/${index}`;
      const chapterElement = `
        <span 
          class="cursor-pointer flex bg-gradient-to-r hover:bg-blue-900 from-grey-600 to-grey-900 text-white rounded-lg p-2 m-1" 
          onclick="goToChapters('${chapterUrl}', '${mangaId}')"
        >
          ${chapter.title}
        </span>
      `;
      return chapterElement;
    })
    .join("");

  $("#chapters").html(elements);

  // For handing description being more than 200 characters
  const summary = $("#summary");
  const summaryText = summary.text().trim();

  if (summaryText.length > 200) {
    const truncatedSummary = summaryText.slice(0, 200) + "...";
    summary.text(truncatedSummary);
    $("#read-more-link").removeClass("hidden");

    $("#read-more-link").on("click", function (event) {
      event.preventDefault();
      summary.text(summaryText);
      $("#read-more-link").addClass("hidden");
      $("#read-less-link").removeClass("hidden");
    });

    $("#read-less-link").on("click", function (event) {
      event.preventDefault();
      summary.text(truncatedSummary);
      $("#read-less-link").addClass("hidden");
      $("#read-more-link").removeClass("hidden");
    });
  }
})();
