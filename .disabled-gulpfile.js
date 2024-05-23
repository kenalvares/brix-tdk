import gulp from "gulp";
const { series, parallel, src, dest, task } = gulp;
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import concat from "gulp-concat";
import process from "process";
const sass = gulpSass(dartSass);

// function compileSass() {
//   process.chdir("..");
//     return gulp.src(process.cwd()+"/myTheme dev/scss/styles.scss") // Path to your SCSS files
//       .pipe(sass().on('error', sass.logError))
//       .pipe(concat("style.css"))
//       .pipe(gulp.dest(process.cwd()+"/myTheme")); // Output directory for CSS files
//   }
//   gulp.task('sass', compileSass);

/*
    "gulp": "^4.0.2",
    "gulp-concat": "^2.6.1",
    "gulp-sass": "^5.1.0",
    "sass": "^1.77.1"
*/

function defaultTask(cb) {
  // place code for your default task here
  // compileSass();
  cb();
}
export default defaultTask;
