const test = async ({ body: { something } }, res) => {
  return res.status(200).json({ message: 'ao' })
}

module.exports = {
  test
}
