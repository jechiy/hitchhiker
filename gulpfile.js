var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var minifyCSS    = require('gulp-minify-css');
var exec         = require('child_process').exec;
var config       = require('./config.js');

gulp.task('build', function(done){
    var sculpinCommande = 'sculpin generate --env=' + config.env;
    return exec(sculpinCommande, function(error, stdout, stderr){
        console.log(stdout);
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    }).on('close', done);
});

gulp.task('build_js', function(){
    return gulp.src(config.src.js)
        .pipe(gulp.dest(config.dist.js));
});

gulp.task('build_vendor', function(){
    return gulp.src(config.src.vendor)
        .pipe(gulp.dest(config.dist.vendor));
});

gulp.task('build_images', function(){
    return gulp.src(config.src.images)
        .pipe(gulp.dest(config.dist.images));
});

gulp.task('sass', function(){
    return gulp.src(config.src.sass)
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest(config.dist.sass));
});

gulp.task("browserSync", ["build", "sass", "build_js", "build_vendor", "build_images"], function() {
    browserSync({
        server: {
            baseDir: ["./" + config.baseDir + "/"]
        },
        files: [ "./" + config.baseDir + "/**"]
    });
});

gulp.task('watch', ['browserSync'], function() {
    gulp.watch( config.watch.sass, ['sass']);
    gulp.watch( config.watch.js, ['build_js']);
    gulp.watch( config.watch.vendor, ['build_vendor']);
    gulp.watch( config.watch.images, ['build_images']);
    gulp.watch( config.watch.src, ['build']);
});

gulp.task('default', ['watch']);