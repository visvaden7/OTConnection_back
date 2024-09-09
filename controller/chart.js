const {Ip} = require("../models/")
const {Op, fn, literal} = require("sequelize");

exports.verticalBarChartData = async(req, res) => {
    const top5Records = await Ip.findAll({
        order: [['release_date', 'DESC']], // 특정 컬럼을 기준으로 내림차순 정렬
        limit: 5, // 상위 5개의 데이터만 불러옵니다.
    });

    const data = top5Records.map(record => {
        return {title: record.title, imdb_rate: record.imdb_rating, release_date: record.release_date, poster: record.ott_profile_link}
    })
    data.sort((a,b) => new Date(a.release_date) - new Date(b.release_date))
    let titleArray=[];
    let imdbArray = [];
    let releaseDateArray = [];
    let posterArray = [];
    // console.log(data)
    data.map((it) => {
        // console.log(it)
        titleArray.push(it.title)
        imdbArray.push(it.imdb_rate)
        releaseDateArray.push(it.release_date)
        posterArray.push(it.poster)
    })
    res.json({title: titleArray, imdb_rate: imdbArray, release_date: releaseDateArray, poster:posterArray})

}

exports.sideStackBarChartData = async(req, res) => {
    const platformCounts = await Ip.findAll({
        attributes: [
            [fn('COUNT', literal(`CASE WHEN webtoon_platform LIKE '%카카오%' THEN 1 END`)), 'kakaoCount'],
            [fn('COUNT', literal(`CASE WHEN webtoon_platform LIKE '%네이버%' THEN 1 END`)), 'naverCount'],
        ]
    });
    const total = Object.values(platformCounts[0].dataValues).reduce((total, count) => total + count,0)

    res.json({kakaoCount: platformCounts[0].dataValues.kakaoCount/total * 100, naverCount: platformCounts[0].dataValues.naverCount/total * 100})
}

exports.doughnutChartData = async(req, res) => {
    const platformCounts = await Ip.findAll({
        attributes: [
            [fn('COUNT', literal(`CASE WHEN ott_platform LIKE '%NETFLIX%' THEN 1 END`)), 'NetflixCount'],
            [fn('COUNT', literal(`CASE WHEN ott_platform LIKE '%WAVVE%' THEN 1 END`)), 'WavveCount'],
            [fn('COUNT', literal(`CASE WHEN ott_platform LIKE '%TVING%' THEN 1 END`)), 'TvingCount'],
            [fn('COUNT', literal(`CASE WHEN ott_platform LIKE '%DISNEY+%' THEN 1 END`)), 'DisneyCount'],
        ]
    })

    const total = Object.values(platformCounts[0].dataValues).reduce((total, count) => total + count,0)

    res.json({NetflixCount: platformCounts[0].dataValues.NetflixCount/total * 100, WavveCount: platformCounts[0].dataValues.WavveCount/total * 100, TvingCount: platformCounts[0].dataValues.TvingCount/total * 100, DisneyCount: platformCounts[0].dataValues.DisneyCount/total * 100})
}

exports.carouselData = async(req, res) => {
    const new6 = await Ip.findAll({
        order: [['imdb_rating', 'DESC']], // 특정 컬럼을 기준으로 내림차순 정렬
        limit: 6,
    })
    // console.log(new6)
    res.json({data:new6})
}

exports.interestWebtoon = async (req, res) => {
    const interestedWebtoonData = await Ip.findAll({
        where: {
            webtoon_platform: { [Op.ne]: null }
        },
        order:[['interest', 'DESC']],
        limit: 5
    })

    const result = interestedWebtoonData.sort((ip1, ip2) => {
        return ip1.interest === ip2.interest ? ip2.likes - ip1.likes : ip2.interest - ip1.interest
    }).reduce((total, ip) => {
        const object = {}
        object['ip_id'] = ip.dataValues.ip_id;
        object['title'] = ip.dataValues.title
        object['webtoon_profile_link'] = ip.dataValues.webtoon_profile_link
        object['interest'] = ip.dataValues.interest
        total.push(object)
        return total
    },[])
    res.json({data: result})
}