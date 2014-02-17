var gulp = require("gulp")
  , gutil = require('gulp-util')
  , browserify = require("gulp-browserify")
  , sass = require("gulp-ruby-sass")
  , jshint = require("gulp-jshint")
  , notify = require("gulp-notify")
  , path = require("path")
  , $$ = {}

// Change context between admin and site
if (!gutil.env.context) {
  throw new Error("Bzzzt must include context");
}
process.chdir(path.join(process.cwd(), "src", gutil.env.context));
gutil.log("Working directory changed to " + gutil.colors.magenta(process.cwd()));

var buildDirs = {
  "admin": "admin",
  "site": "export"
};

// Set up globs
$$ = {
  scripts: {
    all: './**/*.js',
    lint: ['./js/**/*.js', '!./js/vendor/**/*.js'],
    watch: ['./js/**/*.js', './js/app/templates/**/*.html', '!./js/vendor/**/*.js'],
    build: ['./js/main.js']
  },
  styles: {
    all: ['./sass/**/*.sass', './sass/**/*.scss', './sass/**/*.css'],
    build: ['./sass/style.*']
  }
};

$$.buildDir = path.join("..", "..", buildDirs[gutil.env.context], "assets");


/**
 * TASK DEFINITIONS
 * 
 */

gulp.task("scripts", ["jshint"], function () {

  return gulp.src($$.scripts.build)
    .pipe(browserify({
      debug: true,
      transform: ["node-underscorify"]
    }))
    .pipe(gulp.dest($$.buildDir));

});

gulp.task("jshint", function () {

  return gulp.src($$.scripts.lint)
    .pipe(jshint());

});

gulp.task("styles", function () {

  return gulp.src($$.styles.build)
    .pipe(sass())
    .pipe(gulp.dest($$.buildDir));

});

gulp.task("default", ["scripts", "styles"]);

gulp.task("watch", ["scripts", "styles"], function () {

  gulp.watch($$.scripts.watch, ["scripts"]);
  gulp.watch($$.styles.all, ["styles"]);
  
});