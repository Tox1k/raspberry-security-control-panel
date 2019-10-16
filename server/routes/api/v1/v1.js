const express = require('express')
const router = express.Router()

// Routes
const suricata = require('./routes/suricata')
const ossec = require('./routes/ossec')
const clamav = require('./routes/clamav')
const services = require('./routes/services')

// TODO FIX BACK
router.use('/ids', suricata)
router.use('/collector', ossec)
router.use('/antivirus', clamav)
router.use('/services', services)

module.exports = router
