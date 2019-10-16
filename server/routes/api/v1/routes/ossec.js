const express = require('express')
const router = express.Router()

const {
  asyncMiddleware
} = require('../../../../middlewares/async')

const {
  log,
  change
} = require('../../../../controllers/ossec')

router.get('/log', asyncMiddleware(log))
router.post('/change', asyncMiddleware(change))

module.exports = router
