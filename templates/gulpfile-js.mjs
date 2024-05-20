const getGulpfileJsContent = obj => {
return `import gulp from "gulp";
const { series, parallel, src, dest, task } = gulp;
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import concat from "gulp-concat";
import process from "process";
import babel from "gulp-babel";
import uglify from "gulp-uglify";
import autoprefixer from 'gulp-autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
const sass = gulpSass(dartSass);

function compileSass() {
  process.chdir("..");
  return gulp
    .src(process.cwd() + "/${obj.themeName}-dev/scss/styles.scss") // Path to your SCSS files
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("style.css"))
    .pipe(autoprefixer())
    .pipe(gcmq())
    .pipe(gulp.dest(process.cwd() + "/${obj.themeName}")); // Output directory for CSS files
}
gulp.task("sass", compileSass);

function compileJs() {
  return gulp
    .src(process.cwd() + "/${obj.themeName}-dev/js/**/*.js") // Path to your JS file
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat("all.js"))
    .pipe(gulp.dest(process.cwd() + "/${obj.themeName}/js"));
}

function defaultTask(cb) {
  // place code for your default task here
  compileSass();
  compileJs();
  cb();
}
export default defaultTask;
`;
}

export default getGulpfileJsContent;