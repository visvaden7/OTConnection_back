const express = require('express');
const router = express.Router();

const ip = require('./ip.js')
const auth = require('./auth.js')
const chart = require('./chart.js')
const ipInfo = require('./ipInfo.js')

router.use("/ip",ip)
router.use("/auth",auth)
router.use("/chart",chart)
router.use("/ipInfo",ipInfo)


module.exports = router;
