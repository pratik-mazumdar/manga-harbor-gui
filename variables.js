require("dotenv").config();

let baseUrl;
if (process.env.ENVIOURMENT === "development") {
  baseUrl = process.env.DEV_BASE_URL;
} else if (process.env.ENVIOURMENT === "production") {
  baseUrl = process.env.PRODUCTION_BASE_URL;
} else if (process.env.ENVIOURMENT === "testing") {
  baseUrl = process.env.TESTING_BASE_URL;
}

module.exports = {
  appName: "This is Best Manga Services",
  baseUrl: baseUrl,
};
