// 1,加载 依赖包

// gulp依赖包
const gulp = require('gulp');


// css相关的依赖包
// sass依赖包
const sass = require('gulp-sass');
// cssmin依赖包
const cssmin = require('gulp-cssmin');
// autoprefixer依赖包
const autoprefixer = require('gulp-autoprefixer');

// // 加载js相关的依赖包
// // 打包压缩ES5规范的的依赖包
const uglify = require('gulp-uglify');

// // 将其他语法规范,转化为ES5语法规范
const babel = require('gulp-babel');

// // html依赖包
const htmlmin = require('gulp-htmlmin');

// del依赖包
const del = require('del');

// 执行打包压缩规范
// css压缩规范
// const cssHandler = function () {
//     return gulp.src('./src/css/*.css')
//         .pipe(autoprefixer())
//         .pipe(cssmin())
//         .pipe(gulp.dest('D:/phpStudy/WWW/Amazon/css'));

// }
// sass压缩规范
const sassHandler = function(){
    return gulp.src('./src/scss/*.*').pipe(sass()).pipe(autoprefixer()).pipe(cssmin()).pipe(gulp.dest('D:/phpStudy/WWW/Amazon/scss'));
}
// js的压缩规范
const jsHandler = function () {
    return gulp.src('./src/js/*.js')
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(uglify())                           
        .pipe(gulp.dest('D:/phpStudy/WWW/Amazon/js'))           
}

// html文件的打包压缩
const htmlHandler = function(){
    return gulp.src('./src/html/*.html')  
           .pipe(htmlmin({
               removeAttributeQuotes : true ,       //  打包时删除属性上的双引号
               removeComments : true ,              //  删除程序中的注释内容
               collapseBooleanAttributes : true ,   //  删除布尔属性中定义的属性值
               collapseWhitespace : true ,          //  删除程序中多余的空格,只删除标签之前的空格,标签内部和内容的空格不会删除
               minifyCSS : true ,                   //  压缩HTML标签中的css程序代码
               minifyJS : true ,                    //  压缩html标签中的js代码
           // 压缩html文件,会有很多的参数,这些参数之间,必须以逗号间隔
           }))
           .pipe(gulp.dest('D:/phpStudy/WWW/Amazon/html'))         // 将 打包压缩的程序,存储在指定位置上
}

// 音频,视频,图片等,不打压缩,直接移动到指定的文件夹位置
const imgHandler = function () {
    return gulp.src('./src/images/*.*')
        .pipe(gulp.dest('D:/phpStudy/WWW/Amazon/images'))
}

// 插件
const bootstrapHandler = function () {
    return gulp.src('./src/bootstrap-3.3.7-dist/**/*')
        .pipe(gulp.dest('D:/phpStudy/WWW/Amazon/bootstrap-3.3.7-dist'))
}
const jqueryPaginationHandler = function () {
    return gulp.src('./src/jquery-pagination/**/*')
        .pipe(gulp.dest('D:/phpStudy/WWW/Amazon/jquery-pagination'))
}
const libHandler = function () {
    return gulp.src('./src/lib/**/**/**')
        .pipe(gulp.dest('D:/phpStudy/WWW/Amazon/lib'))
}

// php文件直接复制过去
const phpHandler = function () {
    return gulp.src('./src/php/*.php')
        .pipe(gulp.dest('D:/phpStudy/WWW/Amazon/php'))
}


// 指定删除程序
const delHandler = function () {
    return del(['./Amazon']);
}

const watchHandler = function () {
    // gulp.watch('./src/css/*.css', cssHandler);         // 监听 css 文件
    gulp.watch('./src/scss/*.scss', sassHandler);         // 监听 css 文件
    gulp.watch('./src/js/*.js', jsHandler);            // 监听 js 文件
    gulp.watch('./src/html/*.html', htmlHandler);     // 监听 html 文件
    gulp.watch('./src/images/*.*', imgHandler);        // 监听 图片 文件  
    gulp.watch('./src/bootstrap-3.3.7-dist/**/*', bootstrapHandler);       
    gulp.watch('./src/jquery-pagination/**/*', jqueryPaginationHandler);       
    gulp.watch('./src/php/*.php', phpHandler);       
    gulp.watch('./src/php/*.php', libHandler);       
}

module.exports.default = gulp.series(
    delHandler,
    // gulp.parallel(cssHandler,jsHandler,htmlHandler,imgHandler,bootstrapHandler,jqueryPaginationHandler,phpHandler),   //默认的,第一次,初始化,先执行一次所有的打包规范
    gulp.parallel(sassHandler,jsHandler,htmlHandler,imgHandler,bootstrapHandler,jqueryPaginationHandler,phpHandler,libHandler),   //默认的,第一次,初始化,先执行一次所有的打包规范
    watchHandler,
)
