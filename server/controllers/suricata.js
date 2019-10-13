const shell = require('shelljs')

const log = async ({ params: { lines } }, res) => {
  lines = parseInt(lines, 10)
  if (isNaN(lines) || lines <= 0) return res.status(400).json({ message: 'params error!' })
  const path = '/var/log/suricata/fast.log'
  const output = shell.tail({ '-n': lines }, path)
  console.log(output)
  if (output.stderr) return res.status(400).json({ message: output.stderr })
  return res.status(200).json({ log: output })
}

module.exports = {
  log
}
