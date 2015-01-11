var gulp = require('gulp'),
    ngCache = require('gulp-angular-templatecache'),
    inject = require('gulp-inject'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    webserver = require('gulp-webserver'),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
    mainBowerFiles = require('main-bower-files'),
    karma = require('gulp-karma'),
    path = require('path');

gulp.task('default', ['deploy', 'dist','serve'], function() {
  gulp.watch(['src/**/*','!src/index.html'] , ['deploy', 'dist']);
});

gulp.task('deploy', ['test'], function() {
  console.log("deploying TODO: ");
});

gulp.task('index', ['karma-inject'], function () {

  var target = gulp.src('./src/index.html');
  var sources = gulp.src(['./src/app/app.js', '!./src/bower_components/**/*', '!./src/**/*.spec.js', './src/**/*.js', './src/**/*.css'], {read: false});
  target.pipe(inject(sources, {ignorePath: 'src', addRootSlash: false }))
  .pipe(inject(gulp.src(mainBowerFiles(), {read: false}), {ignorePath: 'src', addRootSlash: false, name: 'bower'}))
  .pipe(gulp.dest('./src'));

});

gulp.task('test', function () {
 return gulp.src('./http://stackoverflow.com/questions/22413767/angular-testing-with-karma-module-is-not-defined :)')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    })).on('error', function (err) {
      gulp.watch(['src/**/*','!src/index.html'] , ['deploy', 'dist']); //TODO: warning copy pasted from deploy, workarround for gulp errors
    });
});

gulp.task('karma-inject', function () {
  var sources = gulp.src(['./src/app/app.js', '!./src/bower_components/**/*', './src/**/*.js']);

  return gulp.src('./karma.conf.js')
    .pipe(inject(sources,{starttag: '// gulp-inject:src', endtag: '// gulp-inject:src:end', addRootSlash: false, 
      transform: function (filepath, file, i, length) {
        return '  "' + filepath + '"' + (i + 1 < length ? ',' : '');
      }}))
    .pipe(inject(gulp.src(mainBowerFiles()),{starttag: '// gulp-inject:mainBowerFiles', endtag: '// gulp-inject:mainBowerFiles:end', addRootSlash: false, 
      transform: function (filepath, file, i, length) {
        return '  "' + filepath + '",';
      }}))
    .pipe(gulp.dest('./'));
});

gulp.task('dist', ['index'], function(done) {
  return gulp.src(['src/app/app.js', '!src/**/*.spec.js', 'src/**/*.js'])
    .pipe(concat('anglr.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename('anglr.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});

gulp.task('html-templates', ['sass'], function() {
   return gulp.src([ 'src/**/*.html', '!src/index.html' ])
     .pipe(ngCache({
        filename : 'templates.js',
        module : 'anglr'
      }))
     .pipe(gulp.dest('src'));
});

gulp.task('html-temp-templates-clean', [ 'html-templates', 'dist' ], function() {
  return gulp.src('src/templates.js')
    .pipe(clean({ force: true }));
});

gulp.task('serve', ['dist'], function() {
  //gulp.watch( 'src/**/*' , ['dist']);
  return gulp.src('src')
    .pipe(webserver({
      livereload: true,
      fallback: '/index.html',
      open: true
    }));
});

gulp.task('sass', function () {
  var src = 'src/**/**.scss';
  return gulp.src('src')
      .pipe(sass())
      .pipe(concat('css' + '.css'))
      .pipe(gulp.dest('dist'));
});
