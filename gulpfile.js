'use strict';

var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    concat       = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    cssnano       = require('gulp-cssnano'),
    sourcemaps    = require('gulp-sourcemaps'),
    livereload    = require('gulp-livereload'),
    autoprefixer  = require('gulp-autoprefixer');

//
function errorLog(error) {
   console.error.bind(error);
   this.emit('end');
}


//task
//styles
gulp.task('styles', function () {

	gulp.src('./scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cssnano())
		.pipe(sourcemaps.write('./'))

	.pipe(gulp.dest('./css'))
   .pipe(livereload());

});


//task
//scripts
gulp.task('scripts', function() {

   gulp.src('./scripts/**/*.js')
      .pipe(uglify())
      .on('error', errorLog)
      .pipe(concat('script.js'))
      .pipe(gulp.dest('./js'))

});


//task
//watch
gulp.task('watch', function() {

   var server = livereload();

   gulp.watch('./scripts/**/*.js', ['scripts']);
   gulp.watch('./scss/**/*.scss', ['styles']);

});

//task
//default
gulp.task('default', ['scripts', 'styles', 'watch']);
