const shell = require('shelljs')

const log = async ({ parameters }, res) => {
  const path = '/var/ossec/logs/ossec.log'
  const output = shell.tail({ '-n': 500 }, path)
  console.log(output.reverse())
  if (output.stderr) return res.status(400).json({ message: output.stderr })
  return res.status(200).json({ log: output.stdout.reverse() })
}

module.exports = {
  log
}
