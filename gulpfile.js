
var gulp = require('gulp');


var concat = require('gulp-concat'),
	gutil = require('gulp-util'),
	rename =require('gulp-rename'),
	browserSync = require('browser-sync');






var src = 'src';
var dist = 'dist';
var paths = {
	js: src+ '/js/**/**.js',
	es6: src+ '/js/**/*.es6',
	sass : src + '/sass/**/*.sass',
	html: src + '/**/*.html'
};

gulp.task('html', function () {
		return gulp
		.src(paths.html)
		.pipe(gulp.dest(dist))
		.pipe(browserSync.reload({ stream : true }));
	});

gulp.task('lib', function () {
		return gulp
			.src('src/lib/**/*.js')
		.pipe(gulp.dest(dist+'/lib'))
		.pipe(browserSync.reload({ stream : true }));
	});

gulp.task('combine-js', function(){
	return gulp
			.src(paths.js)
			.pipe(concat('combine.js'))
			.pipe(rename('sketch.js'))
			// .pipe(gzip())
			.pipe(gulp.dest(dist + '/js'))
			.pipe(browserSync.reload(
				{stream : true}
			));
});


// sass config
var sassOptions = {
	outputStyle : "expanded",
	indentType : "tab",
	indentWidth : 1,
	precision: 6,
	sourceComments: false
};





gulp.task('browserSync', ['html', 'combine-js','lib'], function(){
	return browserSync.init({
		port: 9090,
		server: {
			baseDir: './dist'
		}
	});
});



gulp.task('watch', function(){
	gulp.watch(paths.html, ['html']);
	gulp.watch(paths.js, ['combine-js']);
	gulp.watch('src/lib/**/*', ['lib']);
});

gulp.task('default', ['browserSync', 'watch']);