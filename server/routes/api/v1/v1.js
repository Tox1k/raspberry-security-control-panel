const express = require('express')
const router = express.Router()

// Routes
// const suricata = require('./routes/suricata')
// const ossec = require('./routes/ossec')
const clamav = require('./routes/clamav')
const services = require('./routes/services')

// router.use('/suricata', suricata)
// router.use('/ossec', ossec)
router.use('/clamav', clamav)
router.use('/services', services)

module.exports = router
