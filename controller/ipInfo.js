const {Ip} = require("../models/")
const {Op, Sequelize} = require("sequelize");

exports.focusWebtoonOttComboData = async (req, res) => {
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
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
            release_date: {
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

exports.nowBestWebtoon = async (req, res) => {
    try {
        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 24)
        const webtoonList = await Ip.findAll({
            where: {
                [Op.or]: [
                    { webtoon_end_date: { [Op.is]: null } }, // webtoon_end_date가 null인 경우
                    { webtoon_end_date: { [Op.gte]: sixMonthsAgo } } // webtoon_end_date가 6개월 전 이후인 경우
                ]
            },
            order: [
                ['comments','DESC'],
                [Sequelize.literal('ISNULL(webtoon_end_date)'), 'DESC'], // NULL이 먼저 오게 정렬
                ['webtoon_end_date', 'DESC']  // 나머지는 최신 날짜 순으로 정렬
            ],
        });
        //TODO: sort하는 방법 total rating 기준으로
        const top4 = webtoonList.reduce((top4Array, webtoon,idx) => {
            const object = {id: webtoon.dataValues.ip_id, title: webtoon.dataValues.title, webtoon:webtoon.dataValues.webtoon_platform, total_rating: (webtoon.dataValues.rating* 0.5 + webtoon.dataValues.imdb_rating*0.5).toFixed(1), view:webtoon.dataValues.total_views ?? 0, poster: webtoon.dataValues.webtoon_profile_link, rank: idx + 1 };
            top4Array.push(object)
            return top4Array
        },[])
        res.json(top4.slice(0,4))
    } catch(err) {
        console.log(err)
        res.json({error: 'Failed to fetch webtoon list'})
    }
}

exports.recommandByGenre = async(req, res) => {
    try {
        const genre = decodeURIComponent(req.query.genre);
        const recommandOttData = await Ip.findAll({
            where: {
                ott_platform: {
                    [Op.ne]: null,
                    [Op.ne]: ''
                },
                webtoon_platform: {
                    [Op.ne]: null,
                    [Op.ne]: ''
                },
                genre: {
                    [Op.like]: `%${genre}%`
                }
            },
            order: [
                ['total_views','DESC']
            ]
        })
        //TODO: OTT작품이미지, OTT제목, 장르, OTT_PLATFORM,
        //TODO: Webtoon작품이미지, 웹툰제목, 장르,
        res.json('test중')
    } catch (err) {
        console.log(err)
        res.json({error: 'Failed to fetch recommand list'})
    }
}