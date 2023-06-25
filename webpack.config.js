const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "production",
  entry: ["./src/viewModels/chapter.js"],
  output: {
    path: path.resolve(__dirname, "build/viewModels"),
    filename: "chapter.js",
  },
  plugins: [new Dotenv()],
};
