const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
      sass.compiler = require('node-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();


const jsFiles = [ 
    './src/js/main.js'
]


function clean(){
    return del( ['build/*'] );
}


// Styles
function styles() {
    return gulp.src('./src/css/**/*.sass')
               .pipe( sass().on('error', sass.logError) )
               .pipe(concat('all.css'))
               .pipe(cleanCSS({
                   compatibility: 'ie8',
                   level: 2
               }))
               .pipe(autoprefixer({
                    browsers: ['> 0.1%'],
                    cascade: false
                }))
               .pipe( gulp.dest('./build/css') )
               .pipe(browserSync.stream());
}


// Scripts
function scripts(){
    return gulp.src(jsFiles)
               .pipe(concat('main.js'))
               .pipe(babel({
                presets: ['@babel/env']
                }))
               .pipe(uglify({
                    toplevel: true,
                    compress: 2
               }))
               .pipe( gulp.dest('./build/js') )
               .pipe(browserSync.stream());
}

// Watch
function watch(){

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });


    gulp.watch('./src/css/**/*.sass', styles);
    gulp.watch('./src/js/**/*.js', scripts);
    gulp.watch('./*.html').on('change', browserSync.reload);
}


// function test(){
//     gulp.watch('./src/css/**/*.sass', ['sass']);
// }



// Tasks
gulp.task('watch', watch);
gulp.task('clean', clean);
gulp.task('styles', styles);
gulp.task('scripts', scripts);

gulp.task('build',  gulp.series(clean, 
                        gulp.parallel(styles, scripts) 
                    ));


gulp.task('dev', gulp.series('build', 'watch'));