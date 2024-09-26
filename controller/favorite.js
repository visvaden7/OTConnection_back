const {Favorite,Ip} = require("../models/")

exports.checkFavorite = async (req, res) => {
    const {ip_id, user_id} = req.query
    console.log(ip_id, user_id)
    try {
        const data = await Favorite.findAll({
            where: {ip_id: ip_id}
        });

        const isFavorite = data
            .map((row) => row.dataValues)
            .find((favorite) => favorite.user_id === Number(user_id));
        res.json({active: !!isFavorite, count: data.length})
    } catch (err) {
        console.log(err)

    }

}

exports.getFavorite = async (req, res) => {
    if(req.isAuthenticated()) {
        console.log(req.user.id)
        const data = await Favorite.findAll({
            where:{user_id: req.user.id}
        })

        const ipIds = data.map(favorite => favorite.ip_id)
        const ipData = await Ip.findAll({
            where: { ip_id: ipIds },
            attributes: ['ip_id', 'title', 'ott_profile_link']
        });
        const result = ipData.map(item => ({
            ip_id: item.ip_id,
            title: item.title,
            ott_profile_link: item.ott_profile_link
        }));
        res.json(result)
    } else {
        res.json({name:"nope"})
    }
}

exports.addFavorite = async (req, res) => {
    try {
        const {ip_id, user_id} = req.body
        console.log(ip_id, user_id)
        const check = await Favorite.findOrCreate({
            where: {ip_id: ip_id, user_id: user_id},
            defaults: {ip_id: ip_id, user_id: user_id}
        })
        const data = await Favorite.findAndCountAll({
            where: {ip_id: ip_id}
        });
        res.json({active: true, count: data.count})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "찜하기 처리중 오류가 발생 되었습니다."})
    }
}

exports.deleteFavorite = async (req, res) => {
    try {
        const {ip_id, user_id} = req.query
        const deleteOne = await Favorite.destroy({
            where: {
                ip_id: ip_id,
                user_id: user_id
            }
        })
        const data = await Favorite.findAndCountAll({
            where: {ip_id: ip_id}
        });
        res.json({active: false, count: data.count})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "찜하기 처리중 오류가 발생 되었습니다."})
    }
}
