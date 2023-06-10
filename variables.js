require("dotenv").config();

const dev = "production";
let baseUrl;
if (dev === "development") {
  baseUrl = "http://localhost:8000";
} else {
  baseUrl = "https://mangaharbor.net";
}
module.exports = {
  appName: "This is Best Manga Services",
  baseUrl: baseUrl,
};
