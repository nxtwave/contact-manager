var gulp = require('gulp');
var concat = require('gulp-concat');
var wrap = require('gulp-wrap');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var yargs = require('yargs');
var ngannotate = require('gulp-ng-annotate');
var templateCache = require('gulp-angular-templatecache');
var server = require('browser-sync');
var del = require('del');
var path = require('path');
var child = require('child_process');

const exec = child.exec;
const argv = yargs.argv;
const root = 'src/';
const paths = {
  dist: './dist/',
  distDocs: './docs/build',
  docs: './docs/app/*.js',
  scripts: [root + '/app/**/*.js', root + '/app/**/*.spec.js'],
  tests: root + '/app/**/*.spec.js',
  styles: [`${root}/sass/*.scss`, 'node_modules/bootstrap/dist/css/bootstrap.css'],
  fonts: 'node_modules/bootstrap/dist/fonts/*',
  templates: root + '/app/**/*.html',
  modules: [
    'angular/angular.js',
    'angular-ui-router/release/angular-ui-router.js',
    'angular-loading-bar/build/loading-bar.min.js'
  ],
  static: [
    root + '/index.html',
    root + '/fonts/**/*',
    root + '/img/**/*'
  ]
};

server.create();

gulp.task('clean', function() {
  del(paths.dist + '**/**/*')
});

gulp.task('cleanDocs', cb => del(paths.distDocs + '**/**/*', cb));

gulp.task('templates', function() {
  return gulp.src(paths.templates)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(templateCache({
      root: 'app',
      standalone: true,
      transformUrl: function(url) {
        return url.replace(path.dirname(url), '.')
      }
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('modules', ['templates'], function() {
  return gulp.src(paths.modules.map(function(item) {
    return 'node_modules/' + item;
  }))
    .pipe(concat('vendor.js'))
    .pipe(gulpif(argv.deploy, uglify()))
    .pipe(gulp.dest(paths.dist + 'js/'))
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(paths.dist + 'css/'));
});

gulp.task('fonts', function() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.dist + 'fonts/'));
});

gulp.task('scripts', ['modules'], () => {
  return gulp.src([
      `!${root}/app/**/*.spec.js`,
      `${root}/app/**/*.module.js`,
      ...paths.scripts,
    './templates.js'
])
.pipe(concat('bundle.js'))
  .pipe(gulpif(argv.deploy, uglify()))
  .pipe(gulp.dest(paths.dist + 'js/'));
});

gulp.task('serve', function() {
  return server.init({
    files: [paths.dist + '/**'],
    port: 4000,
    server: {
      baseDir: paths.dist
    }
  });
});

gulp.task('copy', ['clean'], function() {
  return gulp.src(paths.static, {base: 'src'})
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', ['serve', 'scripts'], function() {
  gulp.watch([paths.scripts, paths.templates], ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', [
  'copy',
  'styles',
  'fonts',
  'serve',
  'watch'
]);

gulp.task('production', [
  'copy',
  'scripts'
]);

gulp.task('copyDocs', () => {
  return gulp.src(paths.docs)
    .pipe(gulp.dest(paths.distDocs + '/src'));
});

gulp.task('dgeni', ['cleanDocs', 'copyDocs'], () => {
  var dgeni = new Dgeni([require('./docs/config')]);
return dgeni.generate();
});
