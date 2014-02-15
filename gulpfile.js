var gulp = require("gulp")
  , gutil = require('gulp-util')
  , browserify = require("gulp-browserify")
  , sass = require("gulp-ruby-sass")
  , jshint = require("gulp-jshint")
  , notify = require("gulp-notify")
  , $$ = {}
  ;

// Set up some constants for config
$$ = {
  scripts: {
    all: 'src/js/**/*.js',
    lint: ['src/js/**/*.js', '!src/js/vendor/**/*.js'],
    watch: ['src/js/**/*.js', 'src/js/app/templates/**/*.html', '!src/js/vendor/**/*.js'],
    build: ['src/js/main.js']
  },
  styles: {
    all: ['src/sass/**/*.sass', 'src/sass/**/*.scss', 'src/sass/**/*.css'],
    build: ['src/sass/style.*']
  },
  buildDir: {
    root: "./admin/assets"
  }
};

$$.buildDir.js = $$.buildDir.root; // + "/js";
$$.buildDir.css = $$.buildDir.root; // + "/css";

gulp.task("scripts", ["jshint"], function () {

  return gulp.src($$.scripts.build)
    .pipe(browserify({
      debug: true,
      transform: ["node-underscorify"]
    }))
    .pipe(gulp.dest($$.buildDir.js));

});

gulp.task("jshint", function () {

  return gulp.src($$.scripts.lint)
    .pipe(jshint());

});

gulp.task("styles", function () {

  return gulp.src($$.styles.build)
    .pipe(sass())
    .pipe(gulp.dest($$.buildDir.css));

});

gulp.task("default", ["scripts", "styles"]);

gulp.task("watch", ["scripts", "styles"], function () {

  gulp.watch($$.scripts.watch, ["scripts"]);
  gulp.watch($$.styles.all, ["styles"]);
  
});