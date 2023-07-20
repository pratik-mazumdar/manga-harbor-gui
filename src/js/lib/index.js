const $ = require("cash-dom");

function defaultTo(value, defaultValue) {
  return value == null || value !== value ? defaultValue : value;
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

function getParams(slice = 1) {
  const parts = window.location.href.split("/");
  return parts[parts.length - slice];
}

function searchBar(searchUrl) {
  $("#searchForm").on("submit", async (e) => {
    e.preventDefault();
    const searchValue = $("#search").val();
    window.location = `${searchUrl}?p=1&s=${encodeURIComponent(searchValue)}`;
  });
}

function transformDate(date) {
  const dateObj = new Date(date);
  const formattedDate = new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(dateObj);
  return formattedDate;
}

module.exports = {
  $,
  createDiscord,
  searchBar,
  getParams,
  transformDate,
  defaultTo,
};
