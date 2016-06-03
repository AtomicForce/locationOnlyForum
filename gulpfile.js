'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var less = require('gulp-less');
var source = require('vinyl-source-stream');
var nodemon = require('gulp-nodemon');

var config = {
	paths: {
		html: './public/*.html',
		js: './public/**/*.js',
		images: './public/images/*',
		css: './public/styles/_includes.less',
		dist: './dist',
		mainJs: './public/app.js'
	}
};

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist));
});

gulp.task('js', function() {
	browserify({
		entries: [config.paths.mainJs],
		debug: true
	})
	.transform(babelify, { presets: ['es2015', 'react'] })
	.bundle()
	.on('error', console.error.bind(console))
	.pipe(source('bundle.js'))
	.pipe(gulp.dest(config.paths.dist + '/scripts'));
});

gulp.task('css', function() {
	gulp.src(config.paths.css)
        .pipe(less())
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function() {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'));
});

gulp.task('start', function () {
	nodemon({
		script: 'server.js',
		ext: 'js html',
		env: {'NODE_ENV': 'development'}
	});
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js']);
	gulp.watch(config.paths.images, ['images']);
	gulp.watch('./public/styles/**/**/*.less', ['css']);
});

gulp.task('build', ['html', 'images', 'js', 'css']);
gulp.task('serve', ['html', 'images', 'js', 'css', 'start', 'watch']);
