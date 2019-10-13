const shell = require('shelljs')

const execute = async ({ body: { command } }, res) => {
  switch (command) {
    case 'start':
      shell.exec('sudo service clamav start')
      return
    case 'stop':
      shell.exec('sudo service clamav stop')
      return
    case 'restart':
      shell.exec('sudo service clamav restart')
      return
  }
  return res.status(200).json({ message: 'ao' })
}

const status = async ({ parameters }, res) => {
  const output = shell.exec('sudo service clamav status').stdout
  if (output.includes('is not running')) return res.status(200).json({ status: 'not running' })
  if (output.includes('is running')) return res.status(200).json({ status: 'running' })
  return res.status(200).json({ status: 'error' })
}

module.exports = {
  execute,
  status
}
