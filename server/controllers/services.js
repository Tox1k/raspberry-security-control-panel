const shell = require('shelljs')

const execute = async ({ body: { command }, params: { service } }, res) => {
  if (service !== 'suricata' && service !== 'clamav' && service !== 'ossec') return res.status(400).json({ message: 'bad service!' })
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

const status = async ({ params: { service } }, res) => {
  console.log(service)
  if (service !== 'suricata' && service !== 'clamav' && service !== 'ossec') return res.status(400).json({ message: 'bad service!' })
  const output = shell.exec(`sudo service ${service} status`).stdout
  if (output.includes('Active: active (running)')) return res.status(200).json({ status: 'running' })
  if (output.includes('Active: inactive (dead)')) return res.status(200).json({ status: 'dead' })
  return res.status(400).json({ status: 'error' })
}

module.exports = {
  execute,
  status
}
