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
  return res.status(200).json({ message: 'clamav' })
}

const status = async ({ parameters }, res) => {
  const output = shell.exec('sudo service clamav status').stdout
  if (output.includes('Active: inactive (dead)')) return res.status(200).json({ status: 'dead' })
  if (output.includes('Active: active (running)')) return res.status(200).json({ status: 'running' })
  return res.status(200).json({ status: 'error' })
}

module.exports = {
  execute,
  status
}
