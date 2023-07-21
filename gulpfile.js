const babelify = require("babelify");
const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const postcss = require("gulp-postcss");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const template = require("gulp-template");
const rename = require("gulp-rename");
require("dotenv").config();
const variables = require("./variables");

gulp.task("browserify", function () {});

function javascript(file) {
  gulp.task(`js/${file}`, () => {
    return browserify(`src/js/${file}.js`)
      .transform(babelify, {
        presets: ["@babel/preset-env", "@babel/preset-react"],
      })
      .bundle()
      .pipe(source(`${file}-${variables.version}.js`))
      .pipe(gulp.dest("dist/viewModels"));
  });
}

javascript("index");
javascript("manga");
javascript("search");
javascript("chapter");

gulp.task("config", function () {
  // eslint-disable-next-line no-undef
  const env = process.env;
  let variables = {};
  variables.baseUrl = `${env.baseUrl}`;
  if (env.enviourment === "dev") {
    variables.baseUrl = `${env.baseUrlDev}`;
  }
  variables.env = `"${env.enviourment}"`;
  variables.apiUrl = `"${variables.baseUrl}/api/v1"`;
  variables.baseUrl = `"${variables.baseUrl}"`;
  return gulp
    .src("config.tmpl.js")

    .pipe(template(variables))
    .pipe(rename("config.js"))
    .pipe(gulp.dest("src/js"));
});

gulp.task("css", () => {
  return gulp
    .src("src/templates/styles-v1.0.3.css")
    .pipe(postcss([tailwindcss(), autoprefixer()]))
    .pipe(gulp.dest("dist/views"));
});

gulp.task("html", () => {
  return gulp
    .src("src/templates/*.html")
    .pipe(template(variables))
    .pipe(gulp.dest("dist/views"));
});

gulp.task("watch", () => {
  gulp.watch("src/*/*.*", gulp.series("default"));
});
exports.default = gulp.parallel(
  "css",
  "js/index",
  "js/manga",
  "config",
  "html",
  "js/chapter",
  "js/search",
  "watch"
);
