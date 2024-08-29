const Sequelize = require("sequelize");
class Trends extends Sequelize.Model {
    static initiate(sequelize) {
        Trends.init(
            {
                naver_keyword_search: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                naver_female_search: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                naver_male_search: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                naver_10_search: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                naver_20_search: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                naver_30_search: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                naver_40_search: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                naver_50_search: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                ip_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                modelName: "Trends",
                tableName: "trends",
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.Trends.belongsTo(db.Ip, { foreignKey: 'ip_id', targetKey: 'ip_id' });
    }
}

module.exports = Trends;
