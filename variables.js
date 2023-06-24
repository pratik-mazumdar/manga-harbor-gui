require("dotenv").config();

let baseUrl;
if (process.env.ENVIOURMENT === "development") {
  baseUrl = process.env.DEV_BASE_URL;
} else {
  baseUrl = process.env.PRODUCTION_BASE_URL;
}

module.exports = {
  appName: "This is Best Manga Services",
  baseUrl: baseUrl,
};
