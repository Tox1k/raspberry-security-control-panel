const express = require('express')
const router = express.Router()

const {
  asyncMiddleware
} = require('../../../../middlewares/async')

const {
  status
} = require('../../../../controllers/services')
const {
  execute
} = require('../../../../controllers/services')

router.get('/:service/status', asyncMiddleware(status))
router.post('/:service', asyncMiddleware(execute))

module.exports = router
