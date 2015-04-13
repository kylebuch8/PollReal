var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    less = require('gulp-less');

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './app'
        },
        ghostMode: false
    });

    gulp.watch('app/less/**/*.less', ['less']);
});

gulp.task('less', function () {
    return gulp.src('./app/less/app.less')
        .pipe(less())
        .pipe(gulp.dest('./app/styles'));
});


gulp.task('default', ['browser-sync', 'less'], function () {
    gulp.watch(['app/**/*.html', 'app/**/*.js', 'app/styles/**/*.css'], function () {
        browserSync.reload();
    });
});
