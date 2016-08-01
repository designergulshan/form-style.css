var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    rename = require('gulp-rename'),
    cleanCss = require('gulp-clean-css'),
    browserSync = require('browser-sync').create();


// SASS TASK
gulp.task('sass', function () {
  return sass('sass/form-style.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('css'))
    .pipe(cleanCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

// HTML TASK
gulp.task('html', function() {
  return gulp.src('*.html')
    .pipe(browserSync.stream());
});

// WATCH TASK
gulp.task('watch', function() {
  gulp.watch('sass/**/*.scss', ['sass']);
  gulp.watch('*.html', ['html']);
});


// BROWSER SYNC TASK
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// DEFAULT TASK
gulp.task('default',['sass', 'html', 'browser-sync', 'watch']);