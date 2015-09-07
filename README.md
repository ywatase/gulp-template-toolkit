[![Build Status](https://travis-ci.org/ywatase/gulp-template-toolkit.svg?branch=master)](https://travis-ci.org/ywatase/gulp-template-toolkit)

gulp-template-toolkit
===

gulp plugin for converting from tt file to html.

## Requirement

use `tpage` command of `Template-Toolkit`

* Perl
	* Template

```
sudo apt-get install libtemplate-perl   # for Ubuntu or Debian
```

```
cpanm -n Template                       # from source
```

## Install

```
npm install gulp-template-toolkit
```

## Limitation

not support stream mode.

## Usage

```
var gulp = require('gulp');
var filter = require('gulp-filter');
var tt = require('gulp-template-toolkit');

gulp.task('default', function () {
    return gulp.src('sample/tmpl/**/*.tt2')
	    .pipe(filter(['**', '!**/include/**/*.tt2']))
      .pipe(tt({
		    includePath: ['sample/tmpl'],
      }))
      .pipe(gulp.dest('sample/site/'));
});
```

## Options

```
{
	define: {var: value},     // Define template variable
	preChomp: false,          // Chomp leading whitespace
	postChomp: false,         // Chomp trailing whitespace
	trim: false,              // Trim blank lines around template blocks
	absolute: true,           // Allow ABSOLUTE directories (default: true)
	relative: true,           // Allow RELATIVE directories (default: true)
	evalPerl: false,          // Evaluate [% PERL %] ... [% END %] code blocks
	includePath: [path],      // Add directory to includePath
	preProcess: [tt_name],    // Process TEMPLATE before each main template
	postProcess: [tt_name],   // Process TEMPLATE after each main template
	process: tt_name,         // Process TEMPLATE instead of main template
	wrapper: tt_name,         // Process TEMPLATE wrapper around main template
	templateModule: module,   // Specify alternate Template module
	while_max: integer        // Change '$Template::Directive::WHILE_MAX' default
}
```

## License

© Copyright 2015 Yusuke Watase
Released under the MIT license
http://opensource.org/licenses/mit-license.php
