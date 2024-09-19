const express = require('express');
const router = express.Router();

const ip = require('./ip.js')
const auth = require('./auth.js')
const chart = require('./chart.js')
const ipInfo = require('./ipInfo.js')
const creator = require('./creator.js')
const favorite = require('./favorite.js')
const comments = require('./comments')
const post = require('./post')

router.use("/ip",ip)
router.use("/auth",auth)
router.use("/chart",chart)
router.use("/ipInfo",ipInfo)
router.use("/creator", creator)
router.use("/favorite", favorite)
router.use("/comments", comments)
router.use("/post",post)
module.exports = router;
