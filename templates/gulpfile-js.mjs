const getGulpfileJsContent = obj => {
return `import gulp from 'gulp';
const { series, parallel, src, dest, task } = gulp;
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import concat from 'gulp-concat';
import process from 'process';
const sass = gulpSass(dartSass);

function compileSass() {
  process.chdir("..");
    return gulp.src(process.cwd()+"/${obj.themeName}-dev/scss/styles.scss") // Path to your SCSS files
      .pipe(sass().on('error', sass.logError))
      .pipe(concat("style.css"))
      .pipe(gulp.dest(process.cwd()+"/${obj.themeName}")); // Output directory for CSS files
  }
  gulp.task('sass', compileSass);

function defaultTask(cb) {
    // place code for your default task here
    compileSass();
    cb();
  }
export default defaultTask;
`;
}

export default getGulpfileJsContent;