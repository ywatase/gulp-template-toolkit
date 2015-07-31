var gulp = require('gulp');
var tt  = require('./index');

var paths = {
  tt      :'sample/tmpl/**/*.tt2',
  tt_root :'sample/tmpl',
  dest    :'sample/site',
};

gulp.task('tt', function() {
  gulp
  .src(paths.tt)
  .pipe(tt({
    includePath: [paths.tt_root],
    wrapper: 'include/wrapper.tt2'
  }))
  .pipe(gulp.dest(paths.dest));
});

gulp.task('watch', function() {
  gulp.watch(paths.tt,['tt']);
});

gulp.task('build', function(){
  gulp.start('create');
});

gulp.task('create', ['tt']);
gulp.task('default', ['build','watch']);
