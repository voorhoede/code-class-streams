

const { Duplex, Readable, Transform, Writable } = require('stream')

const duplex = new Duplex()
const readable = new Readable()
const transform = new Transform()
const writable = new Writable()


readable.pipe(writable)

readable.pipe(transform).pipe(writable)

duplex.pipe(transform).pipe(duplex)

readable.read()
readable.pause()
readable.resume()
readable.push()
readable.pipe()

readable.on('data', (chunck) => {/* Do Stuff */})
readable.on('error', (error) => {/* Do Stuff */})
readable.on('end', (chunck) => {/* Do Stuff */})

// read a big file and print the number of bytes per chunk
const file = fs.createReadStream('big-file.txt');
readable.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`)
})

writable.write()
writable.end()

writable.on('finish', () => {/* Do Stuff */})
writable.on('error', (error) => {/* Do Stuff */})
writable.on('drain', () => {/* Do Stuff */})

// write 'hello, ' and then end with 'world!'
const file = fs.createWriteStream('hello.txt')
file.write('hello, ')
file.end('world!')

// With inheritance
class Counter extends Readable {
  constructor(opt) {
    super(opt);
    this._max = 1000000
    this._index = 1
  }

  _read() {
    const i = this._index++
    if (i > this._max)
      this.push(null)
    else {
      const str = '' + i
      const buf = Buffer.from(str, 'ascii')
      this.push(buf)
    }
  }
}

// With constructor
const { Readable } = require('stream');

const myReadable = new Readable({
  read(size) {
    // ...
  }
})


// With inheritance
class StringWritable extends Writable {
  constructor(options) {
    super(options)
    const state = this._writableState
    this._decoder = new StringDecoder(state.defaultEncoding)
    this.data = ''
  }
  _write(chunk, encoding, callback) {
    if (encoding === 'buffer') {
      chunk = this._decoder.write(chunk)
    }
    this.data += chunk
    callback()
  }
  _final(callback) {
    this.data += this._decoder.end()
    callback();
  }
}

// With constructor
const { Writable } = require('stream');

const myWritable = new Writable({
  write(chunk, encoding, callback) {
    if (chunk.toString().indexOf('a') >= 0) {
      callback(new Error('chunk is invalid'))
    } else {
      callback()
    }
  }
})
