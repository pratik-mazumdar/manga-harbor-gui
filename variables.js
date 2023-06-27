require("dotenv").config();
const fs = require("fs");
const Handlebars = require("handlebars");

const footer = fs.readFileSync("src/views/footer.html", "utf8");
const header = fs.readFileSync("src/views/header.html", "utf8");

const footerTemplate = Handlebars.compile(footer);
const headerTemplate = Handlebars.compile(header);

let baseUrl;
if (process.env.ENVIOURMENT === "development") {
  baseUrl = "http://localhost:8000";
} else {
  baseUrl = "https://mangaharbor.net";
}

const constants = {
  appName: "Manga Harbor - The Best Manga Service",
  baseUrl: baseUrl,
};

module.exports = {
  ...constants,
  footer: footerTemplate(constants),
  header: headerTemplate(constants),
};
