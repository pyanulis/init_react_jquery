var gulp = require("gulp");
var webpack = require("webpack-stream");
var browserSync = require("browser-sync");
var watch = require("gulp-watch");
var sequence = require("run-sequence");

var serverConfig = {
    server: {
        baseDir:"./bin"
    },
    host: 'localhost',
    port: 9000
};

var task = {
    webServer: "web-server",
    watch: "watch",
    webpack: "webpack",
    html: "html",
    reload: "reload",
    watchBower: "watch-bower",
    init: "init",
    bower: "bower"
};

var path = {
    src: "src/**/*.*",
    bin: "bin",
    bower_src: "bower/**/*.*",
    bower_bin: "bin/bower",
    html_src: "src/*.html",
    webpack_config: "./webpack.config.js"
};

gulp.task(task.webServer, ()=>{
    browserSync(serverConfig);
});

gulp.task(task.webpack, ()=>{
    return gulp.src(path.src)
        .pipe(webpack(require(path.webpack_config)))
        .pipe(gulp.dest(path.bin));
});

gulp.task(task.html, ()=>{
    copy(path.html_src, path.bin);
});

gulp.task(task.reload, ()=>{
    browserSync.reload()
});

gulp.task(task.watch, function(){
    return watch(path.src, ()=>{
        sequence([task.webpack, task.html], task.reload);
    });
});

gulp.task(task.init, function(){
    sequence([task.webpack, task.html, task.bower], task.webServer);
});

gulp.task(task.bower, function(){
    copy(path.bower_src, path.bower_bin);
});

gulp.task(task.watchBower, function(){
    return watch(path.bower_src, ()=>{
        copy(path.bower_src, path.bower_bin);
    });
});

gulp.task("default", [task.init, task.watch]);

function copy(src, dest) {
    gulp.src(src)
        .pipe(gulp.dest(dest));
}