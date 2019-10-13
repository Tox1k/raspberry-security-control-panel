const shell = require('shelljs')

const execute = async ({ body: { command } }, res) => {
  switch (command) {
    case 'start':
      shell.exec('sudo service suricata start')
      return
    case 'stop':
      shell.exec('sudo service suricata stop')
      return
    case 'restart':
      shell.exec('sudo service suricata restart')
      return
  }
  return res.status(200).json({ message: 'suricata' })
}

const status = async ({ parameters }, res) => {
  const output = shell.exec('sudo service suricata status').stdout
  if (output.includes('Active: inactive (dead)')) return res.status(200).json({ status: 'dead' })
  if (output.includes('Active: active (running)')) return res.status(200).json({ status: 'running' })
  return res.status(200).json({ status: 'error' })
}

module.exports = {
  execute,
  status
}
