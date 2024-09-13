const express = require("express")
const router = express.Router()
const {focusWebtoonOttComboData, nowBestWebtoon, recommendByGenre, getIpDetail} = require("../controller/ipInfo");

router.get("/focusWebtoonOttComboData", focusWebtoonOttComboData)
router.get("/nowBestWebtoon", nowBestWebtoon)
//example url : /recommend?genre="로맨스"
router.get("/recommend",recommendByGenre)
router.get("/getIpDetail/:id", getIpDetail)

module.exports = router;