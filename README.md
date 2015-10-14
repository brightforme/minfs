# minfs

A minimal wrapper around file that takes a file and behaves like a stream
by taking slices with every read. Helpful to not blow up you RAM by reading
a massive file into memory.

Without external dependencies and just above 30 LOC.

# Usage

The interface behaves exactly like a normaly `Readable` stream:

```js
var FileStream = require('minfs');

var file = getSomeBigFile();
fs = FileStream(file);

fs.read(10); // will return the first 10 characters of the stream
fs.on('data', doSomethingWithIt);
```
