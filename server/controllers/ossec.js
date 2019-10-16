const shell = require('shelljs')

const validateIp = (ipaddress) => {
  if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
    return (true)
  }
  return (false)
}

const log = async ({ query: { lines } }, res) => {
  lines = parseInt(lines, 10)
  if (isNaN(lines) || lines <= 0) return res.status(400).json({ message: 'params error!' })
  const path = '/var/ossec/logs/ossec.log'
  const output = shell.tail({ '-n': lines }, path)
  if (output.stderr) return res.status(400).json({ message: output.stderr })
  return res.status(200).json({ log: output.stdout })
}

const change = async ({ body: { ip } }, res) => {
  ip = ip.trim()
  if (!validateIp(ip)) return res.status(400).json({ message: 'invalid ip format!' })
  const path = '/var/ossec/etc/ossec.conf'
  const output = shell.sed('-i', '<server-ip>(.*?)</server-ip>', '<server-ip>' + ip + '</server-ip>', path)
  // const output = shell.exec(`sed -r 's/<server-ip>(\b[0-9]{1,3}\.){3}[0-9]{1,3}\b'/"<server-ip>${ip}"/ ${path}`)
  if (output.stderr) return res.status(400).json({ message: output.stderr })
  return res.status(200).json({ log: output.stdout })
}

module.exports = {
  log,
  change
}
