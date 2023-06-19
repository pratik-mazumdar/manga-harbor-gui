require("dotenv").config();

let baseUrl;
if (process.env.ENVIOURMENT === "development") {
  baseUrl = "http://localhost:8000";
} else {
  baseUrl = "https://mangaharbor.net";
}

module.exports = {
  appName: "This is Best Manga Services",
  baseUrl: baseUrl,
};
