const shell = require('shelljs')

const log = async ({ parameters }, res) => {
  // const path = '/var/log/clamav/'
  // const output = shell.tail({'-n': 500}, path)
  // console.log(output)
  // if (output.stderr) return res.status(400).json({ message: output.stderr })
  // return res.status(200).json({ log: output })
  return res.status(200).json({ log: 'NO LOG FOR NOW' })
}

module.exports = {
  log
}
