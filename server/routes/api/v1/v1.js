const express = require('express')
const router = express.Router()

// Routes
const suricata = require('./routes/suricata')
const ossec = require('./routes/ossec')
const clamav = require('./routes/clamav')

router.use('/suricata', suricata)
router.use('/ossec', ossec)
router.use('/clamav', clamav)

module.exports = router
