var gulp = require('gulp');
var sass = require('gulp-sass');
var swig = require('gulp-swig');
var notify = require("gulp-notify");


function defaultError(type){
  return function(err){
    console.log(type + ' error : ' + err);
  };
}

function dist(path){
  return './dist/' + path;
}

function realPath(xs){
  return './static/' + xs;
}

var reportError = function (error) {
    notify({
        title: 'Gulp Task Error',
        message: 'Check the console.'
    }).write(error);

    console.log(error.toString());

    this.emit('end');
}

gulp.task('sass', function(){
  return gulp.src('./static/css/*.scss')
    .pipe(sass({ outputStyle: 'compact' }))
    .on('error', reportError)
    .pipe(gulp.dest(dist('css')))
});

gulp.task('css', function(){
  return gulp.src('./static/css/*.css')
    .pipe(sass({ outputStyle: 'compact' }))
    .on('error', reportError)
    .pipe(gulp.dest(dist('css')))
});

gulp.task('templates', function(){
  return gulp.src(['./*.html','!./base.html'])
    .pipe(swig())
    .pipe(gulp.dest('dist/templates'));
});

gulp.task('libs', function(){
  return gulp.src('./static/js/vendor/*.js')
    .pipe(gulp.dest(dist('js/vendor')));
});

gulp.task('fonts', function(){
  return gulp.src('./static/css/fonts/*.ttf')
    .on('error', reportError)
    .pipe(gulp.dest(dist('css/fonts')))

});

gulp.task('images', function(){
  return gulp.src('./static/css/images/**/*.png')
    .on('error', reportError)
    .pipe(gulp.dest(dist('css/images')))

});
gulp.task('images2', function(){
  return gulp.src('./static/css/images/**/*.jpg')
    .on('error', reportError)
    .pipe(gulp.dest(dist('css/images')))

});
gulp.task('html', function(){
  return gulp.src('*.html')
    .on('error', reportError)
    .pipe(gulp.dest(dist('')))

});

gulp.task('js', function(){
  return gulp.src('./static/js/vendor/**/*.js')
    .on('error', reportError)
    .pipe(gulp.dest(dist('')))

});

gulp.task('css2', function(){
  return gulp.src('./static/css/vendor/*.css')
    .on('error', reportError)
    .pipe(gulp.dest(dist('css/vendor')))

});

gulp.task('watch', function(){
  gulp.watch(['css/**/*.scss'].map(realPath), ['sass']);
  gulp.watch(['*.html'], ['templates']);


});


gulp.task('default', ['sass', 'templates', 'libs','fonts','images','watch', 'css','html','images2','css2']);
