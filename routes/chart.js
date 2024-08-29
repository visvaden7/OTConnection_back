const express = require('express')
const router = express.Router()
const {interestWebtoon, carouselData, doughnutChartData, verticalBarChartData, sideStackBarChartData} = require('../controller/chart.js')


router.get('/top5', verticalBarChartData )
router.get('/webtoon-platform', sideStackBarChartData)
router.get('/ott-platform', doughnutChartData)
router.get('/carouselData', carouselData)
router.get('/interestWebtoon5', interestWebtoon)

module.exports = router;