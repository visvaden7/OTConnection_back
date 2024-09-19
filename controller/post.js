const {Ip} = require("../models");
exports.getPostDetail = async (req, res) => {
    try {
        const {id} = req.params;
        const ipDetailInfo = await Ip.findOne({
            where: {ip_id: id},
            attributes: ['ip_id', 'title', 'webtoon_title', 'webtoon_platform', 'webtoon_start_date', 'webtoon_end_date', 'total_views', 'rating', 'release_date', 'watch_time', 'imdb_rating']
        })
        console.log(ipDetailInfo)
        if (!ipDetailInfo) {
            return res.status(404).json({error: "Ip not found"})
        }
        const ipData = ipDetailInfo.dataValues
        console.log("test", ipData)

        const {
            title,
            webtoon_title,
            webtoon_platform,
            webtoon_start_date,
            webtoon_end_date,
            total_views,
            rating,
            release_date,
            watch_time,
            imdb_rating
        } = ipData
        const result = {
            title,
            webtoon_title,
            webtoon_platform,
            webtoon_start_date,
            webtoon_end_date,
            total_views,
            rating,
            release_date,
            watch_time,
            imdb_rating
        }
        res.json(result)
    } catch (err) {
        console.log("Error get IP Detail", err)
        res.status(500).json({error: "Server Error"})
    }

}