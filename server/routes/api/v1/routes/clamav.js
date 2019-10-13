const express = require('express')
const router = express.Router()

const {
  asyncMiddleware
} = require('../../../../middlewares/async')

const {
  status
} = require('../../../../controllers/clamav')

router.get('/status', asyncMiddleware(status))

module.exports = router
