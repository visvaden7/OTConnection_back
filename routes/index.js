const express = require('express');
const router = express.Router();

const ip = require('./ip.js')
const auth = require('./auth.js')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.use("/ip",ip)
router.use("/auth",auth)

module.exports = router;
