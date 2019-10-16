const shell = require('shelljs')

const execute = async ({ body: { command }, params: { service } }, res) => {
  service = service === 'antivirus' ? 'clamav' : service === 'ids' ? 'suricata' : service === 'collector' ? 'ossec' : service
  console.log(service)
  if (service !== 'suricata' && service !== 'clamav' && service !== 'ossec') return res.status(400).json({ message: 'bad service!' })
  let output
  if (command !== 'start' && command !== 'stop' && command !== 'restart') return res.status(400).json({ message: 'bad command!' })

  switch (command) {
    case 'start':
      output = shell.exec(`service ${service} start`)
      break

    case 'stop':
      output = shell.exec(`service ${service} stop`)
      break

    case 'restart':
      output = shell.exec(`service ${service} restart`)
      break
  }
  if (output.stderr) return res.status(400).json({ status: 'error', message: output.stderr })
  return status({ params: { service } }, res)
}

const status = async ({ params: { service } }, res) => {
  service = service === 'antivirus' ? 'clamav' : service === 'ids' ? 'suricata' : service === 'collector' ? 'ossec' : service
  console.log(service)
  if (service !== 'suricata' && service !== 'clamav' && service !== 'ossec') return res.status(400).json({ message: 'bad service!' })
  const output = shell.exec(`service ${service} status`).stdout
  if (service === 'ossec') shell.exec('/var/ossec/bin/ossec-control reload')
  if (output.includes('Active: active (running)')) return res.status(200).json({ status: 'running' })
  if (output.includes('Active: inactive (dead)')) return res.status(200).json({ status: 'dead' })
  return res.status(200).json({ status: 'error' })
}

module.exports = {
  execute,
  status
}
