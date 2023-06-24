const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  entry: [
    "./src/viewModels/index.js",
    "./src/viewModels/manga.js",
    "./src/viewModels/search.js",
  ],
  output: {
    path: path.resolve(__dirname, "build/viewModels"),
    filename: "bundle.js",
  },
  plugins: [new Dotenv()],
};
