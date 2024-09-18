const {Favorite} = require("../models/")

exports.checkFavorite = async (req, res) => {
    const {id}= req.params
    console.log(id)
    try {
        const data = await Favorite.findAndCountAll({
            where: {ip_id:id}
        })

        const isFavorite = data.count > 0

        res.json({is_favorite: isFavorite ,count: data.count})
    } catch(err) {
        console.log(err)

    }

}

exports.addFavorite = async (req, res) => {
    try {
        const {ip_id, user_id} = req.body
        console.log(ip_id, user_id)
        const [favorite, created] = await Favorite.findOrCreate({
            where: {ip_id: ip_id, user_id: user_id},
            defaults: {ip_id: ip_id, user_id: user_id}
        })

        res.status(201).json({
            message: created ? "찜하기가 성공적으로 추가되었습니다." : "이미 찜한 작품입니다."
        });
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "찜하기 처리중 오류가 발생 되었습니다."})
    }
}

exports.deleteFavorite = async (req, res) => {
    try {
        const {user_id, ip_id} = req.body
        const deleted = await Favorite.destroy({
            where: {
                ip_id: ip_id,
                user_id: user_id
            }
        })
        deleted > 0 ? res.status(200).json({message: '찜하기가 성공적으로 삭제 되었습니다.'}) : res.status(404).json({message: '찜하기 항목을 찾을 수 없습니다.'});
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "찜하기 처리중 오류가 발생 되었습니다."})
    }
}
