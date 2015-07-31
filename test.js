/* global describe, it */

var assert = require('assert'),
    es = require('event-stream'),
    gutil = require('gulp-util'),
    PassThrough = require('stream').PassThrough,
    tt = require('./index');


describe('gulp-template-toolkit', function() {
    it('should work in buffer mode', function(done) {
        var stream = tt();
        var fakeBuffer = new Buffer("[% SET foo = 'bar' %][% foo %]");
        var fakeFile = new gutil.File({
            contents: fakeBuffer,
            path: 'fake.tt2'
        });
        stream.on('data', function(newFile) {
          assert.equal(newFile.contents.toString(), 'bar');
          assert.equal(newFile.path, 'fake.html');
        });
        stream.on('end', function() {
            done();
        });
        stream.write(fakeFile);
        stream.end();
    });

    it('not support stream mode', function(done) {
        var stream = tt();
        var fakeStream = new PassThrough();
        var streamFile = new gutil.File({
            contents: fakeStream
        });
        fakeStream.end();
        stream.on('error', function(err) {
          assert.equal(err.message, 'Streaming not supported');
          done();
        });
        stream.write(streamFile);
        stream.end();
    });

    it('should let null files pass through', function(done) {
        var stream = tt(),
            n = 0;
        stream.pipe(es.through(function(file) {
            assert.equal(file.path, 'null.md');
            assert.equal(file.contents,  null);
            n++;
        }, function() {
            assert.equal(n, 1);
            done();
        }));
        stream.write(new gutil.File({
            path: 'null.md',
            contents: null
         }));
        stream.end();
    });
});
