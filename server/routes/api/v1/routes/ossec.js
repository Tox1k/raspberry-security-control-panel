const express = require('express')
const router = express.Router()

const {
  asyncMiddleware
} = require('../../../../middlewares/async')

const {
  test
} = require('../../../../controllers/ossec')

router.post('/test', asyncMiddleware(test))

module.exports = router
