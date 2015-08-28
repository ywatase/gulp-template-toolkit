var program;
var through = require('through2');
var gutil = require('gulp-util');
var spawn = require('child_process').spawn;

const PLUGIN_NAME = 'gulp-template-toolkit';

function gulpTemplateToolkit (options) {
  var args, cmd;
  if (options === undefined) {
    options = {};
  }
  cmd = 'tpage';
  args = [];

  if (options.define ) {
    Object.keys(options.define).map(function(key){
      args.push('--define ' + key + '=' + options.define[key]);
    });
  }

  if (options.preChomp) {
    args.push('--pre_chomp');
  }
  if (options.postChomp) {
    args.push('--post_chomp');
  }
  if (options.trim) {
    args.push('--trim');
  }
  if (options.absolute) {
    args.push('--absolute');
  }
  if (options.relative) {
    args.push('--relative');
  }
  if (options.includePath) {
    options.includePath.map(function(key) {
      args.push('--include_path=' + key);
    });
  }
  if (options.preProcess) {
    options.preProcess.map(function(key) {
      args.push('--pre_process=' + key);
    });
  }
  if (options.postProcess) {
    options.postProcess.map(function(key) {
      args.push('--post_process=' + key);
    });
  }
  if (options.process) {
    args.push('--process=' + options.process);
  }
  if (options.wrapper) {
    args.push('--wrapper=' + options.wrapper);
  }
  if (options.debug) {
    args.push('--debug=' + options.debug);
  }
  if (options.templateModule) {
    args.push('--template_module=' + options.templateModule);
  }
  return through.obj(function(file, encoding, cb) {
    var b, cd, ext, tt , stdin, str;

    if (file.isNull()) {
      return cb(null, file);
    }
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
      return cb();
    }

    file.path = gutil.replaceExtension(file.path, '.html');

    tt = spawn(cmd, args);

    b = new Buffer(0);
    eb = new Buffer(0);

    tt.stdout.on('readable', function() {
      var chunk;
      while (chunk = tt.stdout.read()) {
        b = Buffer.concat([b, chunk], b.length + chunk.length);
      }
    });
    tt.stdout.on('end', function() {
        file.contents = b;
        return cb(null, file);
    });
    tt.stderr.on('readable', function() {
      var chunk;
      while (chunk = tt.stderr.read()) {
        eb = Buffer.concat([eb, chunk], eb.length + chunk.length);
      }
    });
    tt.stderr.on('end', function() {
      if (eb.length > 0) {
        var err = eb.toString();
        return cb(new gutil.PluginError(PLUGIN_NAME, err));
      }
    });
    stdin = new Buffer(file.contents.toString());
    return tt.stdin.write(stdin, function() {
      return tt.stdin.end();
    });
  });
}

module.exports = gulpTemplateToolkit;
