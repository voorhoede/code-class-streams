const fs = require('fs')
const path = require('path')
const { Readable } = require('stream')

const baseJSON = JSON.stringify({ this: 'codeclass', is: 'the', best: 'evaaa'}) + ','
const basePath = path.join(__dirname, '../files')
const baseText = 'Don\'t forget to bring a towell '
const getPath = (filename) => path.join(basePath, filename)
const iterations = 1000000


class BigFileStream extends Readable {
  constructor(text, max, options) {
    super(options)
    this._max = max;
    this._index = 1;
    this._text = text
  }

  _read() {
    const i = this._index++;
    if (i > this._max)
      this.push(null);
    else {
      const buf = Buffer.from(this._text, 'ascii');
      this.push(buf);
    }
  }
}

function createJSON () {
  const json$ = new BigFileStream(`${baseJSON},`, 1000)
  const file$ = fs.createWriteStream(getPath('big-file.json'))
  file$.write('[')

  json$.on('end', () => file$.write(']'))
  
  json$.pipe(file$)
}

function createText () {
  const text$ = new BigFileStream(baseText, 100000000)
  const file$ = fs.createWriteStream(getPath('big-file.txt'))
  
  text$.pipe(file$)
  text$.on('end', () => file$.end())
}


module.exports = {
  createJSON,
  createText
}