// 请求模块
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

// 创建任务（执行任务）
// 目的：编译sass文件
gulp.task('buildSass',function(){
	// 查找需要编译的文件
	gulp.src('src/sass/*.scss')

		// 编译scss文件
		.pipe(sass({outputStyle:'compact'}))

		// 输出文件
		.pipe(gulp.dest('src/css'))

});


// 监听sass文件
gulp.task('jtSass',function(){
	// 监听文件，当文件有修改时，执行buildSass任务
	gulp.watch('src/sass/*.scss',['buildSass']);
});

//利用browser-sync创建静态服务器
gulp.task('server',function(){
	browserSync({
		//没有php服务器时
		server:{
			baseDir:"./src"
		},

		//有php时代理php的服务器
		// proxy:'http://ip'

		//监听html文件
		files:['./src/*.html','./src/css/*.css','./src/html/*.html'],
	});
	gulp.watch('src/sass/*.scss',['buildSass']);
})

//合并js文件
//gulp.taks()
//gulp.src()
//gulp.watch()
//gulp.dest()

//合并插件
var concat = require('gulp-concat');

//压缩插件
var uglify = require('gulp-uglify');

//重命名插件
var rename = require('gulp-rename');

gulp.task('mergejs',function(){
	gulp.src('./src/js/*.js')
		.pipe(gulp.dest('./dist/js'))
		.pipe(uglify({
			compress: false,//类型：Boolean 默认：true 是否完全压缩
			preserveComments: 'all' //保留所有注释
		}))

		//jquery.min.js,all.min.js
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest('./dist/js'))
})