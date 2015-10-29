var gulp = require('gulp'),     
    sass = require('gulp-ruby-sass') 
    notify = require("gulp-notify") 
    bower = require('gulp-bower')
    bowerRequireJS = require('bower-requirejs')
    minifyCSS = require('gulp-minify-css')
    uglify = require('gulp-uglify')
    nodemon = require('gulp-nodemon')
    react = require('gulp-react')
    del = require('del')
    concat = require('gulp-concat');

var config = {
     sassPath: './sass',
     bowerDir: './bower_components' 
}


gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('bower-requirejs', function(callback) {
    var options = {
        baseUrl: 'js/',
        config: 'js/_config.js',
        transitive: true
    };

    bowerRequireJS(options, function (rjsConfigFromBower) {
        callback();
    });
});


gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./fonts')); 
});


gulp.task('css', function() { 
		return sass(config.sassPath + '/style.scss', { 
				style: 'compressed',
	             loadPath: [
	                 './sass',
	                 config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
	                 config.bowerDir + '/fontawesome/scss',
	             ]
			})
            .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))
             .pipe(gulp.dest('./css')); 
});

gulp.task('minify-css', function() {
	// in order do .src(['./lib/file3.js', './lib/file1.js', './lib/file2.js'])
  return gulp.src('./css/*.css')
  	.pipe(concat('all.css'))
    // .pipe(minifyCSS({keepBreaks:true})) // NOT IN DEV
    .pipe(gulp.dest('./dist/'))
});


gulp.task('scripts', function() {
  return gulp.src('./js/[^_]*.js')
    .pipe(concat('_all.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});

gulp.task('clean', function(cb) {
    del(['dist/*.js', 'dist/*.css', 'js/_all.js', 'js/[^_]*.js'], cb)
});

gulp.task('cleanJs', function(cb) {
    del(['dist/*.js'], cb)
});

// scss err will stay forever otherwise
gulp.task('cleanCss', function(cb) {
    return cb();

    del(['css/style.css'], function(err) {
        cb(); // no error check
    });
});


// convert jsx to js
gulp.task('jsx', function () {
    return gulp.src(['./js/*/*.jsx', './js/*.jsx'])
        .pipe(react())
        .pipe(gulp.dest('./js/'));
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/*.scss', ['cleanCss', 'css', 'minify-css']); 
    gulp.watch('./js/**/*.+(js|jsx)', ['jsx', 'scripts']);
});

// gulp.task('run', function() {
//     // console.log("running...");
//     gulp.task('start', function () {
//   nodemon({
//     script: 'server.js'
//   , ext: 'js html'
//   , env: { 'NODE_ENV': 'development' }
//   })
// })
// });

gulp.task('run', function () {
  nodemon({
    script: 'server.js'
  , ext: 'js html'
  // , env: { 'NODE_ENV': 'development' }
  })
})


// without watch
gulp.task('build', ['clean', 'cleanCss', 'bower', 'bower-requirejs', 'icons', 'css', 'minify-css', 'jsx', 'scripts']);

  gulp.task('default', ['clean', 'cleanCss', 'bower', 'bower-requirejs', 'icons', 'css', 'minify-css', 'jsx', 'scripts', 'watch', 'run']);


