const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "production",
  entry: [
    "./src/viewModels/index.js",
    "./src/viewModels/manga.js",
    "./src/viewModels/search.js",
    "./src/viewModels/chapter.js",
  ],
  output: {
    path: path.resolve(__dirname, "build/viewModels"),
    filename: "bundle.js",
  },
  plugins: [new Dotenv()],
};
