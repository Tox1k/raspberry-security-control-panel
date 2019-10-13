const express = require('express')
const router = express.Router()

const {
  asyncMiddleware
} = require('../../../../middlewares/async')

const {
  test
} = require('../../../../controllers/suricata')

router.post('/test', asyncMiddleware(test))

module.exports = router
