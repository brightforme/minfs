var util = require('util')
  , Readable = require('stream').Readable
  ;

var FileStream = module.exports = function(f, options) {
  Readable.call(this, options);
  this.file = f;
  this.length = f.size;
  this.offset = 0;
  this.SIZE = Math.pow(2, 64);
  this.ended = false;
};

util.inherits(FileStream, Readable);

FileStream.prototype._read = function(size) {
  if(this.ended || this.offset >= this.length) this.push(null);
  var new_offs = this.offset + (size || this.SIZE);
  var x;

  if (new_offs > this.length) {
    x = f.slice(this.offset, this.length);
    this.ended = true;
  } else {
    x = f.slice(this.offset, new_offs);
  }
  this.offset = new_offs;
  var fr = new FileReader(x);
  var self = this;
  fr.onload = function() {
    self.push(this.result);
  };
  fr.readAsText(x);
};
