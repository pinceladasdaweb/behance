var gulp     = require('gulp'),
    header   = require('gulp-header'),
    uglify   = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    rename   = require('gulp-rename'),
    package  = require('./package.json'),
    banner;

banner = [
  '/*! ',
    '<%= package.name %> ',
    'v<%= package.version %> | ',
    '(c) ' + new Date().getFullYear() + ' <%= package.author %> |',
    ' <%= package.homepage %>',
  ' */',
  '\n'
].join('');

gulp.task('compress:js', function() {
  return gulp.src('public/js/app.js')
    .pipe(uglify())
    .pipe(header(banner, { package : package }))
    .pipe(rename("app.min.js"))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('compress:css', function() {
  return gulp.src('public/css/style.css')
    .pipe(cleanCSS())
    .pipe(header(banner, { package : package }))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('public/css/'));
});

gulp.task('watch', function () {
    gulp.watch('public/js/app.js', ['compress:js']);
    gulp.watch(['public/css/style.css'], ['compress:css']);
});

gulp.task('default', ['compress:js', 'compress:css']);