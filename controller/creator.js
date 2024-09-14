const {Person} = require("../models/")

exports.getAllCreator = async (req, res) => {
    try {
        const roleGroup = ["director", "writer"]
        const creatorData = await Person.findAll({
            where: {
                role: roleGroup
            }
        })
        const mappedCreatorData = creatorData.map(creator => {
            return {
                people_id: creator.dataValues.people_id,
                name: creator.dataValues.name,
                profile: creator.dataValues.profile_image,
                role: creator.dataValues.role
            }
        })

        const result = roleGroup.reduce((creatorList, role) => {
            creatorList[role] = mappedCreatorData.filter((creator) => creator.role === role)
            console.log(creatorList)
            return creatorList
        },{})

        res.json({creatorList: result})

    } catch (err) {
        console.log("error", err)
    }

}