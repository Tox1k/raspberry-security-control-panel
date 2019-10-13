const express = require('express')
const app = express()

app.use('/static', express.static('public'))

app.listen(3000, function () {
  console.log('Raspberry Security Control Panel listening on port 3000!')
})
