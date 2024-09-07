const express = require("express")
const router = express.Router()
const {focusWebtoonOttComboData, nowBestWebtoon, recommandByGenre} = require("../controller/ipInfo");

router.get("/focusWebtoonOttComboData", focusWebtoonOttComboData)
router.get("/nowBestWebtoon", nowBestWebtoon)
//example url : /recommand?genre="로맨스"
router.get("/recommand",recommandByGenre)

module.exports = router;