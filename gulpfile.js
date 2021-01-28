const {src, dest, series, watch} = require('gulp');



const scss             =  require('gulp-sass');
      scss.compiler    =  require('node-sass');
const rename           =  require('gulp-rename');
const autoprefixer     =  require('gulp-autoprefixer');
const cleancss         =  require('gulp-clean-css');
const stylelint        =  require('gulp-stylelint');

const fileinclude      =  require('gulp-file-include');

const babel            =  require('gulp-babel');
const terser           =  require('gulp-terser');

const webp             =  require('gulp-webp');
const imgmin           =  require('gulp-imagemin')

const browsersync      =  require('browser-sync').create()

const clean            =  require('gulp-clean')


function html() {
    return src("app/**/*.html")
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('build/'))
}

function styles() {
    return src("app/scss/**.*")
        .pipe(stylelint({
            failAfterError: false,
        }))
        .pipe(scss())
        .pipe(autoprefixer({cascade: false,grid: true,}))
        .pipe(cleancss({level: 2, compatibility: 'ie9'}))
        .pipe(rename("main.css"))
        .pipe(dest("build/css"))
}

function scripts() {
    return src("app/js/**/*.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(terser())
        .pipe(rename("main.js"))
        .pipe(dest('build/js'))
}

function img() {
    return src('app/img/src/**.*')
        .pipe(imgmin())
        .pipe(dest('build/img/dist/'))
}

function imgToWebp() {
    return src('app/img/src/**.+(jpg|png|jpeg)')
        .pipe(webp())
        .pipe(dest('build/img/webp'))
}

function serve() {
    browsersync.init({
        server: {
            baseDir:  "build/",
        },
        // tunnel: "localtunnelYourProject"
    })

    watch("app/scss/*.scss", series(styles));
    watch("app/**/*.html", series(html)).on('change', browsersync.reload);
    watch("app/js/*.js", series(scripts) ).on("change", browsersync.reload);
    watch("app/img/src/**.*").on("change", series(img));
}


exports.clean = function( ) {
    return src("build/", {read: false})
        .pipe(clean())
}

exports.webp  = imgToWebp;
exports.default = series(styles, scripts, imgToWebp, img, html, serve)
exports.build   = series(styles, scripts, img, imgToWebp);
