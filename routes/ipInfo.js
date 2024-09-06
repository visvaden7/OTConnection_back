const express = require("express")
const router = express.Router()
const {focusWebtoonOttComboData} = require("../controller/ipInfo");

router.get("/focusWebtoonOttComboData", focusWebtoonOttComboData)

module.exports = router;