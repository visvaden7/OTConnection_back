const express = require('express');
const router = express.Router();

const ip = require('./ip.js')
const auth = require('./auth.js')

router.use("/ip",ip)
router.use("/auth",auth)

module.exports = router;
