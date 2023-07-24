const $ = require("cash-dom");
const isNil = require("lodash.isnil");

function defaultTo(value, defaultValue) {
  return value == null || value !== value ? defaultValue : value;
}

function getParams(slice = 1, link = window.location.href) {
  const parts = link.split("/");
  return parts[parts.length - slice];
}

function setContinueReading(params) {
  let continueReading = localStorage.getItem("continueReading");
  const currentChapter = getParams(1, params.link);
  if (!isNil(continueReading)) {
    continueReading = JSON.parse(continueReading);
    localStorage.setItem(
      "continueReading",
      JSON.stringify({ ...continueReading, [params.mangaId]: currentChapter })
    );
  } else {
    localStorage.setItem(
      "continueReading",
      JSON.stringify({ [params.mangaId]: currentChapter })
    );
  }
}

function getContinueReading() {
  let continueReading = localStorage.getItem("continueReading");
  continueReading = JSON.parse(continueReading);
  if (!isNil(continueReading)) {
    return {
      ids: Object.keys(continueReading),
      chapterId: Object.values(continueReading),
    };
  }
  return null;
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
  getParams,
  setContinueReading,
  transformDate,
  defaultTo,
  getContinueReading,
};
