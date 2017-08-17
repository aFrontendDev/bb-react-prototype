const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const rollup = require('rollup-stream');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const builtins = require('rollup-plugin-node-builtins');
const globals = require('rollup-plugin-node-globals');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const elm = require('gulp-elm');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const stylus = require('gulp-stylus');
const environments = require('gulp-environments');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const CacheBuster = require('gulp-cachebust');

const cachebust = new CacheBuster();
const development = environments.development;
const production = environments.production;


gulp.task('css', function () {
  return gulp.src('src/css/main.styl')
    .pipe(development(sourcemaps.init()))
    .pipe(stylus({compress: true}))
    .pipe(production(autoprefixer()))
    .pipe(production(cachebust.resources()))
    .pipe(development(sourcemaps.write('.')))
    .pipe(gulp.dest('resources/public/css'));
});


gulp.task('elm-init', elm.init);


gulp.task('elm', ['elm-init'], function () {
  return gulp.src('src/elm/Main.elm')
    .pipe(elm({warn: true}))
    .pipe(gulp.dest('/tmp/'));
});


gulp.task('elm-post', ['elm'], function () {
  return gulp.src('/tmp/Main.js')
    .pipe(production(uglify()))
    .pipe(rename('main.js'))
    .pipe(production(cachebust.resources()))
    .pipe(gulp.dest('resources/public/js'));
});


gulp.task('html', ['css', 'elm-post', 'js'], function () {
  return gulp.src('src/html/index.html')
    .pipe(production(htmlmin({ collapseWhitespace: true })))
    .pipe(production(cachebust.references()))
    .pipe(gulp.dest('resources/public'));
});


gulp.task('js', function () {
  return rollup({
      entry: 'src/js/main.js',
      format: 'iife',
      plugins: [
        resolve(),
        commonjs({
          include: 'node_modules/**'
        }),
        globals(),
        builtins(),
        babel({
          exclude: 'node_modules/**'
        })
      ],
      sourceMap: true
    })
    .pipe(source('main.js', './src'))
    .pipe(buffer())
    .pipe(development(sourcemaps.init({loadMaps: true})))
    .pipe(production(uglify()))
    .pipe(rename('raslink.js'))
    .pipe(production(cachebust.resources()))
    .pipe(development(sourcemaps.write('.')))
    .pipe(gulp.dest('resources/public/js'));
});


gulp.task('watch', function () {
  gulp.watch(['src/html/index.html', 'src/js/**/*.js', 'src/elm/**/*.elm', 'src/css/**/*.styl'],
             ['html']);
});


gulp.task('default', ['html']);
