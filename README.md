# minfs

A minimal wrapper around file that takes a file and behaves like a readable
stream by taking slices with every read. Helpful to not blow up you RAM by
reading a massive file into memory.

Without external dependencies and just above 30 LOC.

# Usage

The interface behaves exactly like a normal `Readable` stream:

```js
var FileStream = require('minfs');

var file = getSomeBigFile();
fs = FileStream(file);

fs.read(10); // will return the first 10 characters of the stream
fs.on('data', doSomethingWithIt);
```

# FAQ

**Q: Why are you not returning ArrayBuffers?**

A: In our specific use case we need this to pass a file into Popsicle on
Electron (which uses readable-strem under the hood) and this specifically
wants a string (or at least chokes on an ArrayBuffer). You mileage may vary.

**Q: Why do you implement Readable only?**

Because we do not want to keep all the file contents in memory and still
keep it simple and elegant. If memory is not an issue for you, you could look
into [filestream](https://github.com/DamonOehlman/filestream) which we have
never used but found when wanting to register our package on NPM-JS. It will
keep all the file contents in a buffer until you are finished with it.
