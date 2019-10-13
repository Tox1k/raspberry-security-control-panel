const shell = require('shelljs')

console.log('ssh =>', shell.exec('service ssh status').stdout)
