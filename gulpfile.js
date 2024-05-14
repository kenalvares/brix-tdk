import gulp from 'gulp';
const { series, parallel, src, dest, task } = gulp;
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import concat from 'gulp-concat';
const sass = gulpSass(dartSass);

function compileSass() {
    return gulp.src('../test/sass/**/*.scss') // Path to your SCSS files
      .pipe(sass().on('error', sass.logError))
      .pipe(concat("style.css"))
      .pipe(gulp.dest('../test')); // Output directory for CSS files
  }
  gulp.task('sass', compileSass);

function defaultTask(cb) {
    // place code for your default task here
    compileSass();
    cb();
  }
export default defaultTask
