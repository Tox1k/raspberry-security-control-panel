const shell = require('shelljs')

const log = async ({ parameters: { lines } }, res) => {
  const path = '/var/ossec/logs/ossec.log'
  const output = shell.tail({ '-n': lines }, path)
  if (output.stderr) return res.status(400).json({ message: output.stderr })
  return res.status(200).json({ log: output.stdout })
}

module.exports = {
  log
}
