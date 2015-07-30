gulp-template-toolkit
===

gulpでttからhtmlを生成するためのモジュール

## Requirement

`Template-Toolkit`の`tpage`コマンドを使用しています。

* Perl
	* Template

## INSTALL

```
npm install https://github.com/ywatase/gulp-template-toolkit/archive/master.tar.gz
```

## USAGE

```
var gulp = require('gulp');
var filter = require('gul-filter');
var tt = require('gulp-template-toolkit');

gulp.task('default', function () {
    return gulp.src('src/tmpl/**/*.tt2')
	    .pipe(filter(['*', '!**/include/**/*.tt2']
        .pipe(tt2({
		    includePath: 'src/tmpl'
        }))
        .pipe(gulp.dest('site/'));
});
```

## OPTIONS

```
{
	define: {var: value},     // Define template variable
	preChomp: false,          // Chomp leading whitespace
	postChomp: false,         // Chomp trailing whitespace
	trim: false,              // Trim blank lines around template blocks
	absolute: true,           // Allow ABSOLUTE directories (default: true)
	relative: true,           // Allow RELATIVE directories (default: true)
	includePath: [path],      // Add directory to includePath
	preProcess: [tt_name],    // Process TEMPLATE before each main template
	postProcess: [tt_name],   // Process TEMPLATE after each main template
	process: tt_name,         // Process TEMPLATE instead of main template
	wrapper: tt_name,         // Process TEMPLATE wrapper around main template
	templateModule: module,   // Specify alternate Template module
	while_max: integer        // Change '$Template::Directive::WHILE_MAX' default
}
```
