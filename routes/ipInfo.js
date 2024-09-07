const express = require("express")
const router = express.Router()
const {focusWebtoonOttComboData, nowBestWebtoon, recommendByGenre} = require("../controller/ipInfo");

router.get("/focusWebtoonOttComboData", focusWebtoonOttComboData)
router.get("/nowBestWebtoon", nowBestWebtoon)
//example url : /recommend?genre="로맨스"
router.get("/recommend",recommendByGenre)

module.exports = router;