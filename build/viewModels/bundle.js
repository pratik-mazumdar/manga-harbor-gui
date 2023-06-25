/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/viewModels/index.js":
/*!*********************************!*\
  !*** ./src/viewModels/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { createCard, config } = __webpack_require__(/*! ./lib */ \"./src/viewModels/lib.js\");\n\nconst searchForm = document.querySelector(\"#searchForm\");\nsearchForm.addEventListener(\"submit\", async (e) => {\n  e.preventDefault();\n  const searchValue = document.querySelector(\"#search\").value;\n  window.location = `${config.baseUrl}/search?p=1&s=${encodeURIComponent(\n    searchValue\n  )}`;\n});\n\n(async () => {\n  // Load mangas from the API\n  const params = new URLSearchParams(location.search);\n  const page = parseInt(params.get(\"page\")) || 0;\n  const nextPageLink = document.getElementById(\"next\");\n  const previousPageLink = document.getElementById(\"back\");\n  if (page !== 0) {\n    previousPageLink.classList.remove(\"hidden\");\n    previousPageLink.href = `${config.baseUrl}?page=${page - 1}`;\n  }\n  nextPageLink.href = `${config.baseUrl}?page=${page + 1}`;\n\n  const response = await fetch(`${config.baseUrl}/api/v1/page/${page}`);\n  const { mangaList } = await response.json();\n\n  const cardsContainer = document.getElementById(\"cards\");\n  mangaList.forEach((eachCard) => {\n    const cardElement = createCard({\n      id: eachCard.id,\n      title: eachCard.title,\n      link: eachCard.link,\n      status: eachCard.status,\n      lastUpdated: eachCard.last_updated,\n      genre: eachCard.genre,\n      author: eachCard.author,\n      thumbnail: eachCard.thumbnail,\n    });\n    cardsContainer.appendChild(cardElement);\n  });\n})();\n\n\n//# sourceURL=webpack://mangaharbor/./src/viewModels/index.js?");

/***/ }),

/***/ "./src/viewModels/lib.js":
/*!*******************************!*\
  !*** ./src/viewModels/lib.js ***!
  \*******************************/
/***/ ((module) => {

eval("if (false) {} else if (true) {\n  baseUrl = \"https://mangaharbor.net\";\n  apiUrl = `${\"https://mangaharbor.net\"}/api/v1`;\n} else {}\n\nconst transformDate = function (date) {\n  const dateObj = new Date(date);\n  const formattedDate = new Intl.DateTimeFormat(\"en\", {\n    day: \"2-digit\",\n    month: \"2-digit\",\n    year: \"2-digit\",\n    hour: \"numeric\",\n    minute: \"numeric\",\n    hour12: true,\n  }).format(dateObj);\n  return formattedDate;\n};\n\nconst redirectManga = function (id) {\n  location.href = `manga?id=${id}`;\n};\n\nmodule.exports.transformDate = transformDate;\nmodule.exports.redirectManga = redirectManga;\n\nmodule.exports.config = {\n  baseUrl: baseUrl,\n  apiUrl: apiUrl,\n};\n\nmodule.exports.__ = function (id) {\n  return document.getElementById(id);\n};\n\nmodule.exports.getPara = function () {\n  let parts = window.location.href.split(\"/\");\n  return parts[parts.length - 1];\n};\n\nmodule.exports.createCard = function (params) {\n  const card = document.createElement(\"div\");\n  card.className = \"h-64 cursor-pointer\";\n  card.addEventListener(\"click\", () => redirectManga(params.id));\n\n  const innerContainer = document.createElement(\"div\");\n  innerContainer.className =\n    \"w-full h-full bg-gray-700 grid grid-cols-2 rounded-lg\";\n  card.appendChild(innerContainer);\n\n  const image = document.createElement(\"img\");\n  image.className = \"h-64 p-2\";\n  image.src = params.thumbnail;\n  image.loading = \"lazy\";\n  innerContainer.appendChild(image);\n\n  const detailsContainer = document.createElement(\"div\");\n  innerContainer.appendChild(detailsContainer);\n\n  const title = document.createElement(\"div\");\n  title.className = \"flex mb-3 font-sans font-semibold\";\n  title.textContent = params.title;\n  detailsContainer.appendChild(title);\n\n  const status = document.createElement(\"div\");\n  status.className = \"flex text-sm\";\n  status.textContent = `Status: ${params.status}`;\n  detailsContainer.appendChild(status);\n\n  const author = document.createElement(\"div\");\n  author.className = \"flex text-sm\";\n  author.innerHTML = `Author: <span class=\"text-xs\">${params.author}</span>`;\n  detailsContainer.appendChild(author);\n\n  const genre = document.createElement(\"div\");\n  genre.className = \"flex text-sm\";\n  genre.innerHTML = `Genre: <span class=\"text-xs\">${params.genre}</span>`;\n  detailsContainer.appendChild(genre);\n\n  const lastUpdated = document.createElement(\"div\");\n  lastUpdated.className = \"flex text-sm\";\n  lastUpdated.textContent = `Last Updated: ${transformDate(\n    params.lastUpdated\n  )}`;\n  detailsContainer.appendChild(lastUpdated);\n\n  return card;\n};\n\n\n//# sourceURL=webpack://mangaharbor/./src/viewModels/lib.js?");

/***/ }),

/***/ "./src/viewModels/manga.js":
/*!*********************************!*\
  !*** ./src/viewModels/manga.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { __, transformDate, config } = __webpack_require__(/*! ./lib */ \"./src/viewModels/lib.js\");\n\n(async function () {\n  // Handle manga infromation\n  let params = new URLSearchParams(location.search);\n  let response = await fetch(\n    `${config.baseUrl}/api/v1/manga/${params.get(\"id\")}`,\n    {\n      method: \"get\",\n    }\n  );\n\n  const searchForm = document.querySelector(\"#searchForm\");\n  searchForm.addEventListener(\"submit\", async (e) => {\n    e.preventDefault();\n    const searchValue = document.querySelector(\"#search\").value;\n    window.location = `${config.baseUrl}/search?p=1&s=${encodeURIComponent(\n      searchValue\n    )}`;\n  });\n\n  let manga_details = (await response.json()).manga;\n  __(\"title\").innerText = manga_details.title;\n  __(\"status\").innerText = manga_details.status;\n  __(\"author\").innerText = manga_details.author;\n  __(\"last-updated\").innerText = transformDate(manga_details.last_updated);\n  __(\"genre\").innerText = manga_details.genre;\n  __(\"summary\").innerText = manga_details.summary;\n  __(\"thumbnail\").src = manga_details.thumbnail;\n\n  // Handle manga chapters\n  response = await fetch(\n    `${config.baseUrl}/api/v1/chapter/${params.get(\"id\")}`,\n    {\n      method: \"get\",\n    }\n  );\n  const chapters = await response.json();\n  let elements = \"\";\n  for (let id = 0; id < chapters.length; id = id + 2) {\n    elements += `<a class=\"flex bg-gradient-to-r hover:bg-blue-900 from-grey-600 to-grey-900 text-white rounded-lg p-2 m-1\" href=\"${config.baseUrl}/chapter/${chapters[id].id}\"> ${chapters[id].title}</a>`;\n    if (chapters[id + 1])\n      elements += `<a class=\"flex bg-gradient-to-r hover:bg-blue-900 from-grey-500 to-black-700 text-white rounded-lg p-2 m-1\" href=\"${\n        config.baseUrl\n      }/chapter/${chapters[id + 1].id}\"> ${chapters[id + 1].title}</a>`;\n  }\n  __(\"chapters\").innerHTML = elements;\n\n  // For handing description being more than 200 characters\n  const summary = document.getElementById(\"summary\");\n  const summaryText = summary.textContent.trim();\n  const readMoreLink = document.getElementById(\"read-more-link\");\n  const readLessLink = document.getElementById(\"read-less-link\");\n\n  if (summaryText.length > 200) {\n    const truncatedSummary = summaryText.slice(0, 200) + \"...\";\n    summary.textContent = truncatedSummary;\n    readMoreLink.classList.remove(\"hidden\");\n\n    readMoreLink.addEventListener(\"click\", (event) => {\n      event.preventDefault();\n      summary.textContent = summaryText;\n      readMoreLink.classList.add(\"hidden\");\n      readLessLink.classList.remove(\"hidden\");\n    });\n\n    readLessLink.addEventListener(\"click\", (event) => {\n      event.preventDefault();\n      summary.textContent = truncatedSummary;\n      readLessLink.classList.add(\"hidden\");\n      readMoreLink.classList.remove(\"hidden\");\n    });\n  }\n})();\n\n\n//# sourceURL=webpack://mangaharbor/./src/viewModels/manga.js?");

/***/ }),

/***/ "./src/viewModels/search.js":
/*!**********************************!*\
  !*** ./src/viewModels/search.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const { createCard, __ } = __webpack_require__(/*! ./lib */ \"./src/viewModels/lib.js\");\n\n// Handle search bar\n__(\"searchForm\").onsubmit = async function (e) {\n  e.preventDefault();\n  window.location = `${config.baseUrl}/search?p=1&s=${__(\"search\").value}`;\n};\n(async () => {\n  let params = new URLSearchParams(location.search);\n  let page = params.get(\"p\");\n  let search = params.get(\"s\");\n  if (page === null) page = 1;\n  else if (page !== \"1\") {\n    document.getElementById(\"back\").classList.remove(\"hidden\");\n    document.getElementById(\"back\").href = `${\n      config.baseUrl\n    }/search?s=${search}&p=${page - 1}`;\n  }\n  document.getElementById(\"next\").href = `${\n    config.baseUrl\n  }/search?s=${search}&p=${parseInt(page) + 1}`;\n  let response = await fetch(\n    `${config.baseUrl}/api/v1/search?s=${search}&p=${page}`,\n    {\n      method: \"get\",\n    }\n  );\n  let mangaList = (await response.json()).mangaList;\n  mangaList.forEach((eachCard) => {\n    cards.innerHTML += createCard({\n      id: eachCard.id,\n      title: eachCard.title,\n      link: eachCard.link,\n      status: eachCard.status,\n      lastUpdated: eachCard.last_updated,\n      genre: eachCard.genre,\n      author: eachCard.author,\n      thumbnail: eachCard.thumbnail,\n    });\n  });\n})();\n\n\n//# sourceURL=webpack://mangaharbor/./src/viewModels/search.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_require__("./src/viewModels/index.js");
/******/ 	__webpack_require__("./src/viewModels/manga.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/viewModels/search.js");
/******/ 	
/******/ })()
;