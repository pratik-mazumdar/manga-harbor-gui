const { config } = require("../config");
module.exports.urls = {
  base: config.baseUrl,
  api: config.apiUrl,
  search: `${config.baseUrl}/search`,
  home: `${config.baseUrl}/home`,
  manga: `${config.apiUrl}/manga`,
  chapter: `${config.apiUrl}/chapter`,
  images: `${config.apiUrl}/images`,
  image: `${config.apiUrl}/image`,
};
