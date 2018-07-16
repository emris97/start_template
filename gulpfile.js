let gulp = require('gulp');
let	sass = require('gulp-sass');
let	browserSync = require('browser-sync');
let autoprefixer = require('gulp-autoprefixer');

gulp.task('default', ['watch']);

gulp.task('clear', function () {
    return cache.clearAll();
})

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
		.pipe(sass({outputStyle: 'expanded'})).on('error', sass.logError)
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
		.pipe(gulp.dest('app/css/'))
		.pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: { baseDir: 'app/' },
		notify: false
	});
});

gulp.task('watch', ['browser-sync', 'sass'], function() {
	gulp.watch('app/sass/**/*.sass', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});