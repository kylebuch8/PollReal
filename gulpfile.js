var gulp = require('gulp'),
    browserSync = require('browser-sync')

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './app'
        },
        ghostMode: false
    });
});


gulp.task('default', ['browser-sync'], function () {
    gulp.watch(['app/**/*.html', 'app/**/*.js', 'app/styles/**/*.css'], function () {
        browserSync.reload();
    });
});
