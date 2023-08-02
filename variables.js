const fs = require("fs");
require("dotenv").config();
const _ = require("lodash");
const { version } = require("./package.json");

// eslint-disable-next-line no-undef
const env = process.env;
let variables = {};
variables.baseUrl = `${env.baseUrl}`;
if (env.enviourment === "dev") {
  variables.baseUrl = `${env.baseUrlDev}`;
}
variables.env = `${env.enviourment}`;
variables.apiUrl = `${variables.baseUrl}/api/v1`;
variables.version = version;

const header = _.template(fs.readFileSync("src/templates/header.html", "utf8"));
const footer = _.template(fs.readFileSync("src/templates/footer.html", "utf8"));
const meta = _.template(fs.readFileSync("src/templates/meta.html", "utf8"));
module.exports = {
  appName: "Manga Harbor - The Best Manga Service",
  ...variables,
  header: header(variables),
  footer: footer(variables),
  meta: meta(variables),
};
