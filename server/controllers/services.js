const shell = require('shelljs')

const execute = async ({ body: { command }, params: { service } }, res) => {
  if (service !== 'suricata' && service !== 'clamav' && service !== 'ossec') return res.status(400).json({ message: 'bad service!' })
  let output
  if (command !== 'start' && command !== 'stop' && command !== 'restart') return res.status(400).json({ message: 'bad command!' })

  switch (command) {
    case 'start':
      output = shell.exec(`sudo service ${service} start`)
      break

    case 'stop':
      output = shell.exec(`sudo service ${service} stop`)
      break

    case 'restart':
      output = shell.exec(`sudo service ${service} restart`)
      break
  }
  if (output.stderr) return res.status(400).json({ message: output.stderr })
  return status({ params: service }, res)
}

const status = async ({ params: { service } }, res) => {
  console.log(service)
  if (service !== 'suricata' && service !== 'clamav' && service !== 'ossec') return res.status(400).json({ message: 'bad service!' })
  const output = shell.exec(`sudo service ${service} status`).stdout
  if (output.includes('Active: active (running)')) return res.status(200).json({ status: 'running' })
  if (output.includes('Active: inactive (dead)')) return res.status(200).json({ status: 'dead' })
  return res.status(200).json({ status: 'error' })
}

module.exports = {
  execute,
  status
}
