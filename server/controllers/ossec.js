const shell = require('shelljs')

const execute = async ({ body: { command } }, res) => {
  switch (command) {
    case 'start':
      shell.exec('sudo service ossec start')
      return
    case 'stop':
      shell.exec('sudo service ossec stop')
      return
    case 'restart':
      shell.exec('sudo service ossec restart')
      return
  }
  return res.status(200).json({ message: 'ossec' })
}

const status = async ({ parameters }, res) => {
  const output = shell.exec('sudo service ossec status').stdout
  if (output.includes('is not running')) return res.status(200).json({ status: 'not running' })
  if (output.includes('is running')) return res.status(200).json({ status: 'running' })
  return res.status(200).json({ status: 'error' })
}

module.exports = {
  execute,
  status
}
