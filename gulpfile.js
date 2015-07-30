var gulp = require('gulp');
var tt  = require('./index');

var paths = {
  tt      :'test/tmpl/**/*.tt',
  tt_root :'test/tmpl',
  dest    :'test/site',
};

gulp.task('tt', function() {
  gulp
  .src(paths.tt)
  .pipe(tt({
    includePath: [paths.tt_root],
    wrapper: 'include/wrapper.tt'
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
