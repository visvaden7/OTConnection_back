const {Ip} = require("../models/")
const {Op, Sequelize} = require("sequelize");
const {shuffle} = require("../utils/shuffle");
const Trends = require("../models/trends");
const axios = require("axios");

exports.focusWebtoonOttComboData = async (req, res) => {
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
    const comboList = await Ip.findAll({
        where: {
            ott_platform: {
                [Op.ne]: null,  // NULL 값이 아닌지 확인
                [Op.ne]: ''     // 빈 문자열이 아닌지 확인 (필요한 경우)
            }, webtoon_platform: {
                [Op.ne]: null, [Op.ne]: ''
            }, release_date: {
                [Op.gte]: sixMonthsAgo  // 6개월 전 날짜 이후의 데이터만 가져옴
            }
        },
        attributes: ['ip_id', 'title', 'imdb_rating', 'rating', 'ott_platform', 'webtoon_platform', 'ott_profile_link'],
        order: [['imdb_rating', 'DESC']], // 특정 컬럼을 기준으로 내림차순 정렬
        limit: 5, // 상위 5개의 데이터만 불러옵니다.
    });

    const comboData = comboList.map((ip) => {
        return {
            id: ip.dataValues.ip_id,
            title: ip.dataValues.title,
            platform: ip.dataValues.ott_platform.split(','),
            webtoon: ip.dataValues.webtoon_platform,
            total_rating: (ip.dataValues.rating * 0.5 + ip.dataValues.imdb_rating * 0.5).toFixed(1),
            poster: ip.dataValues.ott_profile_link
        };
    }, [])
    console.log(comboData)
    comboData.sort((a, b) => b.total_rating - a.total_rating)
    res.json(comboData.slice(0, 3))
}

exports.nowBestWebtoon = async (req, res) => {
    try {
        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 24)
        const webtoonList = await Ip.findAll({
            where: {
                [Op.or]: [{webtoon_end_date: {[Op.is]: null}}, // webtoon_end_date가 null인 경우
                    {webtoon_end_date: {[Op.gte]: sixMonthsAgo}} // webtoon_end_date가 6개월 전 이후인 경우
                ]
            }, order: [['comments', 'DESC'], [Sequelize.literal('ISNULL(webtoon_end_date)'), 'DESC'], // NULL이 먼저 오게 정렬
                ['webtoon_end_date', 'DESC']  // 나머지는 최신 날짜 순으로 정렬
            ],
        });
        //TODO: sort하는 방법 total rating 기준으로
        const top4 = webtoonList.reduce((top4Array, webtoon, idx) => {
            const object = {
                id: webtoon.dataValues.ip_id,
                title: webtoon.dataValues.title,
                webtoon: webtoon.dataValues.webtoon_platform,
                total_rating: (webtoon.dataValues.rating * 0.5 + webtoon.dataValues.imdb_rating * 0.5).toFixed(1),
                view: webtoon.dataValues.total_views ?? 0,
                poster: webtoon.dataValues.webtoon_profile_link,
                rank: idx + 1
            };
            top4Array.push(object)
            return top4Array
        }, [])
        res.json(top4.slice(0, 4))
    } catch (err) {
        console.log(err)
        res.json({error: 'Failed to fetch webtoon list'})
    }
}

exports.recommendByGenre = async (req, res) => {
    try {
        const genreGroup = [{name: "drama", genres: ["드라마"]}, {name: "romance", genres: ["로맨스"]}, {
            name: "actionCrime",
            genres: ['액션', '범죄']
        }, {name: "fantasySF", genres: ['판타지', 'SF']}, {name: "thrillerHorror", genres: ['스릴러', '호러']},]
        const results = await Promise.all(genreGroup.map(async (group) => {
            const recommendOttData = await Ip.findAll({
                where: {
                    ott_platform: {
                        [Op.ne]: null, [Op.ne]: ''
                    }, webtoon_platform: {
                        [Op.ne]: null, [Op.ne]: ''
                    }, genre: {
                        [Op.or]: group.genres.map(g => ({
                            [Op.like]: `%${g}%`
                        }))
                    }
                }, order: [['watch_time', 'DESC']]
            })
            const recommendWebtoonData = await Ip.findAll({
                where: {
                    ott_platform: {
                        [Op.ne]: null, [Op.ne]: ''
                    }, webtoon_platform: {
                        [Op.ne]: null, [Op.ne]: ''
                    }, genre: {
                        [Op.or]: group.genres.map(g => ({
                            [Op.like]: `%${g}%`
                        }))
                    }
                }, order: [['total_views', 'DESC']]
            })
            const recommendOttList = recommendOttData.map((ott) => {
                return {
                    ip_id: ott.dataValues.ip_id,
                    title: ott.dataValues.title,
                    genre: ott.dataValues.genre,
                    platform: ott.dataValues.ott_platform.split(','),
                    profile: ott.dataValues.ott_profile_link,
                    watch_time: ott.dataValues.watch_time,
                    type: "ott"
                }
            })
            const recommendWebtoonList = recommendWebtoonData.map((webtoon) => {
                return {
                    ip_id: webtoon.dataValues.ip_id,
                    title: webtoon.dataValues.webtoon_title,
                    genre: webtoon.dataValues.genre,
                    platform: webtoon.dataValues.webtoon_platform.split(','),
                    profile: webtoon.dataValues.webtoon_profile_link,
                    view: webtoon.dataValues.total_views,
                    type: "webtoon"
                }
            })
            shuffle(recommendOttList)
            shuffle(recommendWebtoonList)

            return {
                [group.name]: {
                    ottList: recommendOttList.slice(0, 3), webtoonList: recommendWebtoonList.slice(0, 3)
                }
            }
        }))
        const finalData = results.reduce((ipList, ip) => {
            return {...ipList, ...ip};
        }, {});

        res.json(finalData)
        //TODO: checkList
    } catch (err) {
        console.log(err)
        res.json({error: 'Failed to fetch recommend list'})
    }
}

exports.getIpDetail = async (req, res) => {
    try {
        const {id} = req.params;
        const ipDetailInfo = await Ip.findOne({
            where: {ip_id: id},
            include: {
                model: Trends,
                attributes: ['naver_keyword_search', 'naver_female_search', 'naver_male_search', 'naver_10_search', 'naver_20_search', 'naver_30_search', 'naver_40_search', 'naver_50_search'],
            }, attributes: ['ip_id', 'title', 'genre', 'imdb_rating', 'banner_link', ['ott_platform', 'platform'],

            ]
        })

        const response = await axios.get(`${process.env.BACKEND_SERVER_URL}/api/ip/tv/96648`)
        const tmdbData = response.data
        const actorList = tmdbData.actorListData.cast.map(person => {
            return {
                person_id: person.id,
                charName: person.character,
                role: person.known_for_department,
                profile: `https://media.themoviedb.org/t/p/w138_and_h175_face/${person.profile_path}`
            }
        })

        if (!ipDetailInfo) {
            return res.status(404).json({error: "Ip not found"})
        }
        const ipData = ipDetailInfo.dataValues
        const {ip_id, title, genre, imdb_rating, banner_link, platform} = ipData
        const {naver_10_search, naver_20_search, naver_30_search, naver_40_search, naver_50_search } = ipData.Trends[0]
        const totalAgeSearchNum = naver_10_search + naver_20_search + naver_30_search + naver_40_search + naver_50_search


        const result = {
            ip_id,
            title,
            imdb_rating,
            banner_link,
            genre: genre ? genre.split(',') : [],
            platform: platform
                ? platform.includes(',')
                    ? platform.split(',')
                    : [platform]
                : [],
            actorList: actorList,
            trends: {
                naver_male_search : ipData.Trends[0].naver_male_search,
                naver_female_search : ipData.Trends[0].naver_female_search,
                naver_10_search_percentage: (naver_10_search / totalAgeSearchNum * 100).toFixed(0),
                naver_20_search_percentage: (naver_20_search / totalAgeSearchNum * 100).toFixed(0),
                naver_30_search_percentage: (naver_30_search / totalAgeSearchNum * 100).toFixed(0),
                naver_40_search_percentage: (naver_40_search / totalAgeSearchNum * 100).toFixed(0),
                naver_50_search_percentage: (naver_50_search / totalAgeSearchNum * 100).toFixed(0)
            }
        }
        res.json(result)
    } catch (err) {
        console.log("Error get IP Detail", err)
        res.status(500).json({error: "Server Error"})
    }

}
