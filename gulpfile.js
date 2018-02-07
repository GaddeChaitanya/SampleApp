/* 
----Top level functions----
gulp.task - Define tasks
gulp.src - Point to the files to use
gulp.dest - Point to the folder to output
gulp.out - Watch the files and folders for changes
*/

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

const ts = require('gulp-typescript');

// const browserSync = require('browser-sync').create();
// const cssmin = require('gulp-cssmin');
// const rename = require('gulp-rename');

//Log Message
gulp.task('Message',function(){
    return console.log('Gulp is running......');
})

//Typescript to javascript

gulp.task('typeToJS', function () {
   return gulp.src('src/**/*.ts')
       .pipe(ts({
           noImplicitAny: true,
           outFile: 'output.js'
       }))
       .pipe(gulp.dest('dist/local'));
});

//Copy HTML Files into dest

gulp.task('copyHTML',()=>{
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
})

gulp.task('copyHTML',()=>{
    gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/html'));
})

gulp.task('imageMin', function(){
    gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
});

//Default task example
gulp.task('default',function(){
    return console.log('Gulp is running......');
})

//Minify js
// gulp.task('minfy',function(){
//     gulp.src('src/js/*.js')
//     .pipe(uglify())
//     .pipe(gulp.dest('dist/js'))
// })

//Compile sass
gulp.task('sass',function(){
    gulp.src('src/sass/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('dist/css'));
})

//Concat and minify js file
gulp.task('scripts',function(){
    gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
})

//Minify CSS
gulp.task('default', function () {
    gulp.src('src/**/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('default',['Message','copyHTML','imageMin','sass','scripts','typeToJS']);

gulp.task('watch',()=>{
    gulp.watch('src/js/*.js',['scripts']);
    gulp.watch('src/sass/*.scss',['sass']);
    gulp.watch('src/images/*',['imageMin']);
    gulp.watch('src/*.html',['copyHTML']);
})


// const browserSync = gulp.require('browser-sync').create();

// gulp.task('css',()=>{
//     gulp.src(styles)
//     .pipe(concat('main.css'))
//     .pipe(gulp.dest('dist/css'))
//     .pipe(browserSync.reload({
//           stream:true;
//     }));
// })

// gulp.task('browser-sync',()=>{
//     browserSync.init(null,{
//         open:false,
//         server: {
//             baseDir:'dist'
//         }
//     });
// });

// gulp.task('start',()=>{
//     devMode = true;
//     gulp.start(['build','browser-sync']);
//     gulp.watch([])
// })
