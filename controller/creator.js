const {Person} = require("../models/")

exports.getAllCreator = async (req, res) => {
    try {
        const roleGroup = ["director", "writer"]
        const creatorList = await Person.findAll({
            where: {
                role: roleGroup
            }
        })

        const result = roleGroup.reduce((acc, role) => {
            acc[role] = creatorList.filter(creator => creator.dataValues.role === role)
            return acc
        }, {})
        res.json({creatorList: result})

    } catch (err) {
        console.log("error", err)
    }

}