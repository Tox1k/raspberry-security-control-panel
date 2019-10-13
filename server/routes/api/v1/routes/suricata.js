const express = require('express')
const router = express.Router()

const {
  asyncMiddleware
} = require('../../../../middlewares/async')

const {
  log
} = require('../../../../controllers/suricata')

router.get('/log', asyncMiddleware(log))

module.exports = router
