const bigFile = require('../lib/create-big-file')
const mkdirp = require('mkdirp');
const path = require('path')


mkdirp(path.join(__dirname, '../exercises/'))
mkdirp(path.join(__dirname, '../files/'))

bigFile.createJSON()
bigFile.createText()