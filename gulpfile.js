var gulp = require('gulp');
var connect = require('connect');
var livereload = require('gulp-watch');
var watch = require('gulp-watch');
var rimraf = require('rimraf');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var ngTemplate = require('gulp-ng-templates');
var htmlmin = require('gulp-htmlmin');
var stylish = require('jshint-stylish');
var jshint = require('gulp-jshint');
var historyApiFallback = require('connect-history-api-fallback');
var karma = require('karma');


var debug = false;

var sassPaths = [
    'bower_components/bootstrap-sass/assets/stylesheets/',
    'bower_components/font-awesome/scss/'
];

var jsVendorPaths = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js'
];

gulp.task('clean', function(cb) {
    rimraf('./dist', cb);
});

gulp.task('connect', function() {
	gulp.watch(['src/index.html'], function() {
		gulp.src(['src/index.html'])
		.pipe(connect.reload());
	});

  connect.server({
    root: 'dist',
    livereload: true,
    port: 8082,
      middleware: function(connect, opt) {
      return [ historyApiFallback() ];
    }
  });
});

gulp.task('watch-mode', function() {
	var jsWatcher = gulp.watch(['src/app/**/*.js'], ['js']);
	var cssWatcher = gulp.watch('src/style/**/*.scss', ['css']);
  var htmlWatcher = gulp.watch('src/index.html', ['html']);
  var tplWatcher = gulp.watch('src/app/**/*.tpl.html', ['tpl']);


	function changeNotification(event) {
		console.log('File', event.path, 'was', event.type, ', running tasks...');
	}

	jsWatcher.on('change', changeNotification);
	cssWatcher.on('change', changeNotification);
	htmlWatcher.on('change', changeNotification);
  tplWatcher.on('change', changeNotification);
});


gulp.task('css', function() {
	var cssTask = gulp.src('src/style/style.scss');

	cssTask.pipe(sass({ includePaths : sassPaths }))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload());

    return cssTask;
});

gulp.task('font', function() {
  gulp.src(['bower_components/bootstrap-sass/assets/fonts/**/**.*'])
  .pipe(gulp.dest('dist/fonts'));

  gulp.src(['bower_components/font-awesome/fonts/**.*'])
  .pipe(gulp.dest('dist/fonts'));
});

gulp.task('js', function() {
    var app = './src/app/';
    var files = [
        app + '**/*.module.js',
        app + '**/*.js'
    ];

    var jsTask = gulp.src(files);

    if(!debug)
        jsTask.pipe(uglify());

    jsTask.pipe(concat('app.js'))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('js:vendor', function() {
    var jsVendorTask = gulp.src(jsVendorPaths);

    if(!debug)
        jsVendorTask.pipe(uglify());

    jsVendorTask.pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('lint', function() {
    gulp.src(['src/app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('html', function() {
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('tpl', function() {
    var tplTask = gulp.src(['src/app/**/*.tpl.html']);

    tplTask.pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(ngTemplate('app-tpl'))
    .pipe(concat('app-tpl.js'))
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload());
});

gulp.task('image', function () {
	gulp.src('src/imgs/**/**.*')
	.pipe(gulp.dest('dist/imgs'))
	.pipe(connect.reload());
});

gulp.task('tdd', function(done) {
    new karma.Server({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

gulp.task('test', function(done) {
    new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});
gulp.task('debug', function() {
    debug = true;
});

gulp.task('build', ['css', 'font', 'js', 'js:vendor','lint', 'html','tpl','image']);
gulp.task('default', ['watch-mode', 'build']);
gulp.task('serve', ['connect', 'debug', 'default']);
