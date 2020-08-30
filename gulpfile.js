const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');

const pipeline = {
  assets: {
    src: 'app/assets/*',
    dest: 'public/assets/',
  },
  css: {
    src: 'app/assets/css/**/*.css',
    dest: 'public/css/',
  },
  js: {
    src: 'app/assets/js/**/*.js',
    dest: 'public/js/',
  },
  templates: {
    src: 'app/views/**/*.hbs',
  },
};

function assets() {
  return gulp.src(pipeline.assets.src)
    .pipe(gulp.dest(pipeline.assets.dest));
};

function css() {
  return gulp.src(pipeline.css.src)
    .pipe(concat('style.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest(pipeline.css.dest))
    .pipe(browserSync.reload({stream: true}));
}

function js() {
  return gulp.src(pipeline.js.src)
    .pipe(concat('main.js'))
    .pipe(babel())
    .pipe(gulp.dest(pipeline.js.dest))
    .pipe(browserSync.reload({stream: true}));
}

function templates() {
  return browserSync.reload();
}

function watch() {
  browserSync({ port: 4000, proxy: { target: 'localhost:3000', ws: true } });

  gulp.watch(pipeline.assets.src).on('change', assets);
  gulp.watch(pipeline.css.src).on('change', css);
  gulp.watch(pipeline.js.src).on('change', js);
  gulp.watch(pipeline.templates.src).on('change', templates);
}

function build() {
  gulp.parallel(assets, css, js);
}

exports.dev = watch;
exports.default = build; 