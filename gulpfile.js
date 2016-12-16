var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');

gulp.task('reload', function() {

	browserSync.reload();

});

gulp.task('serve', ['sass'], function() {

	browserSync({
		server:'main_folder'
	});

	gulp.watch('main_folder/*.html', ['reload']);
	gulp.watch('main_folder/scss/**/*.scss', ['sass']);
});

gulp.task('sass', function() {

	return gulp.src('main_folder/scss/**/*.scss')	
		   .pipe(sass().on('error', sass.logError))
		   .pipe(gulp.dest('main_folder/css'))
		   .pipe(browserSync.stream());      
});

gulp.task('default', ['serve'], function() {


});