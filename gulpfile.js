var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var minifyCSS    = require('gulp-minify-css');
var exec         = require('child_process').exec;
var rmdir        = require( 'rmdir' );

gulp.task('build', function(callback){
    return exec('sculpin generate', function(error, stdout, stderr){
        console.log(stdout);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    }).on('close', callback);
    /*rmdir('./output_dev', function(){
    });*/
});

gulp.task('build_js', function(){
    return gulp.src('./assets/js/**/*.*')
        .pipe(gulp.dest('./output_dev/assets/js'));
});

gulp.task('build_vendor', function(){
    return gulp.src('./assets/vendor/**/*.*')
        .pipe(gulp.dest('./output_dev/assets/vendor'));
});

gulp.task('sass', function(){
    return gulp.src('./assets/sass/**')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./output_dev/assets'));
});

gulp.task('browserSync', ['build', 'sass', 'build_js', 'build_vendor'], function() {
    browserSync({
        server: {
            baseDir: ['./output_dev/']
        },
        files: [ "./output_dev/**"]
    });
});

gulp.task('watch', ['browserSync'], function() {
    gulp.watch('./assets/sass/**', ['sass']);
    gulp.watch('./assets/js/**', ['build_js']);
    gulp.watch('./assets/vendor/**', ['build_vendor']);
    gulp.watch('./source/**', ['build']);
});

gulp.task('default', ['watch']);