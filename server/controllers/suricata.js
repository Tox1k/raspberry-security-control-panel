const shell = require('shelljs')

const log = async ({ params: { lines } }, res) => {
  const path = '/var/log/suricata/fast.log'
  const output = shell.tail({ '-n': lines }, path)
  console.log(output)
  if (output.stderr) return res.status(400).json({ message: output.stderr })
  return res.status(200).json({ log: output })
}

module.exports = {
  log
}
