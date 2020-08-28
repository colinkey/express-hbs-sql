const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');

const pipeline = {
  assets: {
    src: 'assets/*',
    dest: 'public/assets/',
  },
  css: {
    src: 'views/**/*.css',
    dest: 'public/css/',
  },
  js: {
    src: 'views/**/*.js',
    dest: 'public/js/',
  },
};

function assets() {
  return gulp.src(pipeline.assets.src).pipe(gulp.dest(pipeline.assets.dest));
};

function css() {
  gulp.src(pipeline.css.src).pipe(cleanCSS()).pipe(gulp.dest(pipeline.css.dest));
}

function js() {
  gulp.src(pipeline.js.src).pipe(babel()).pipe(gulp.dest(pipeline.js.dest));
}

function watch() {
  gulp.watch(pipeline.assets.src, assets);
  gulp.watch(pipeline.css.src, css);
  gulp.watch(pipeline.js.src, js);
}

function build() {
  gulp.parallel(assets, css, js);
}

exports.dev = watch;
exports.default = build; 