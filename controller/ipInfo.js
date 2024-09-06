const {Ip} = require("../models/")
const {Op} = require("sequelize");

exports.focusWebtoonOttComboData = async (req, res) => {
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 60)
    const comboList = await Ip.findAll({
        where: {
            ott_platform: {
                [Op.ne]: null,  // NULL 값이 아닌지 확인
                [Op.ne]: ''     // 빈 문자열이 아닌지 확인 (필요한 경우)
            },
            webtoon_platform: {
                [Op.ne]: null,
                [Op.ne]: ''
            },
            webtoon_start_date: {
                [Op.gte]: sixMonthsAgo  // 6개월 전 날짜 이후의 데이터만 가져옴
            }
        },
        attributes: ['ip_id','title', 'imdb_rating','rating','ott_platform', 'webtoon_platform','ott_profile_link'],
        order: [['imdb_rating', 'DESC']], // 특정 컬럼을 기준으로 내림차순 정렬
        limit: 5, // 상위 5개의 데이터만 불러옵니다.
    });

    const comboData = comboList.reduce((comboArray, ip) => {
        const object = {id: ip.dataValues.ip_id, title: ip.dataValues.title, ott: ip.dataValues.ott_platform, webtoon:ip.dataValues.webtoon_platform, total_rating: (ip.dataValues.rating* 0.5 + ip.dataValues.imdb_rating*0.5).toFixed(1), poster: ip.dataValues.ott_profile_link };
        comboArray.push(object)
        return comboArray
    },[])
    console.log(comboData)
    comboData.sort((a,b) => b.total_rating - a.total_rating)
    res.json(comboData.slice(0,3))
}