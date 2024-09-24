const Sequelize = require('sequelize')

class VirtualCasting extends Sequelize.Model {
    static initiate(sequelize) {
        VirtualCasting.init(
            {
                virtual_casting_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                virtual_casting_title: {
                  type: Sequelize.STRING,
                  allowNull: true
                },
                virtual_casting_image_url: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                char_main: {
                    type: Sequelize.STRING,
                },
                char_main_url: {
                    type: Sequelize.STRING,
                },
                char_sub1: {
                    type: Sequelize.STRING,
                },
                char_sub1_url: {
                    type: Sequelize.STRING,
                },
                char_sub2: {
                    type: Sequelize.STRING,
                },
                char_sub2_url: {
                    type: Sequelize.STRING,
                },
                char_sub3: {
                    type: Sequelize.STRING,
                },
                char_sub3_url: {
                    type: Sequelize.STRING,
                },
                actor_main_casting1: {
                    type: Sequelize.STRING,
                },
                actor_main_casting1_recommend: {
                    type: Sequelize.INTEGER,
                },
                actor_main_casting1_url: {
                    type: Sequelize.STRING,
                },
                actor_main_casting2: {
                    type: Sequelize.STRING,
                },
                actor_main_casting2_recommend: {
                    type: Sequelize.INTEGER,
                },
                actor_main_casting2_url: {
                    type: Sequelize.STRING,
                },
                actor_sub1_casting1: {
                    type: Sequelize.STRING,
                },
                actor_sub1_casting1_recommend: {
                    type: Sequelize.INTEGER,
                },
                actor_sub1_casting1_url: {
                    type: Sequelize.STRING,
                },
                actor_sub1_casting2: {
                    type: Sequelize.STRING,
                },
                actor_sub1_casting2_recommend: {
                    type: Sequelize.INTEGER,
                },
                actor_sub1_casting2_url: {
                    type: Sequelize.STRING,
                },
                actor_sub2_casting1: {
                    type: Sequelize.STRING,
                },
                actor_sub2_casting1_recommend: {
                    type: Sequelize.INTEGER,
                },
                actor_sub2_casting1_url: {
                    type: Sequelize.STRING,
                },
                actor_sub2_casting2: {
                    type: Sequelize.STRING,
                },
                actor_sub2_casting2_recommend: {
                    type: Sequelize.INTEGER,
                },
                actor_sub2_casting2_url: {
                    type: Sequelize.STRING,
                },
                actor_sub3_casting1: {
                    type: Sequelize.STRING,
                },
                actor_sub3_casting1_recommend: {
                    type: Sequelize.INTEGER,
                },
                actor_sub3_casting1_url: {
                    type: Sequelize.STRING,
                },
                actor_sub3_casting2: {
                    type: Sequelize.STRING,
                },
                actor_sub3_casting2_recommend: {
                    type: Sequelize.INTEGER,
                },
                actor_sub3_casting2_url: {
                    type: Sequelize.STRING,
                },
            },
            {
                sequelize,
                timestamps: true,
                modelName: "VirtualCasting",
                tableName: "virtualCasting",
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
            }

        )
    }
}

module.exports = VirtualCasting;