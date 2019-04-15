const gulp = require("gulp");

const gulpSass = require("gulp-sass");
const cssmin = require("gulp-clean-css");

const webserver = require("gulp-webserver");

const babel = require("gulp-babel");
const uglify = require("gulp-uglify");

const htmlmin = require("gulp-htmlmin");
const imgmin = require("gulp-imagemin");


gulp.task("devsass", () => {
    return gulp.src("./src/**/*.scss")
        .pipe(gulpSass())
        .pipe(gulp.dest("./src/css"))
})
gulp.task("devbabel", () => {
    return gulp.src("./src/js/**/*.js")
        .pipe(babel({
            presets: ["env"]
        }))
        .pipe(gulp.dest("./src/javascript"))
})


gulp.task("watching", () => {
    return gulp.watch(["./src/sass/**/*.scss", "./src/js/**/*.js"], gulp.series("devsass", "devbabel"))
})


gulp.task("server", () => {
    return gulp.src("./src")
        .pipe(webserver({
            port: 8080,
            open: true,
            livereload: true,
        }))
})

gulp.task("default", gulp.series("devsass", "devbabel", "server", "watching"));



//压缩

gulp.task("zipcss", () => {
    return gulp.src("./src/css/sass/**/*.css")
        .pipe(cssmin())
        .pipe(gulp.task("./dist/css"))
})

gulp.task("zipjs", () => {
    return gulp.src("./src/js/**/*.js")
        .pipe(uglify())
        .pipe(gulp.task("./dist/js"))
})

gulp.task("ziphtml", () => {
    return gulp.src("./src/*.html")
        .pipe(htmlmin())
        .pipe(gulp.task("./dist"))
})

gulp.task("zipimg", () => {
    return gulp.src("./src/img/**/*.jpg")
        .pipe(imgmin())
        .pipe(gulp.task("./dist/img"))
})

gulp.task("zip", gulp.parallel("zipcss", "zipjs", "ziphtml", "zipimg"));