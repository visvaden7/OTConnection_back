const Sequelize = require("sequelize");

class OttUrl extends Sequelize.Model {
    static initiate(sequelize) {
        OttUrl.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                tving_url: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                netflix_url: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                disneyplus_url: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                wavve_url: {
                    type: Sequelize.STRING(200),
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
                modelName: "OttUrl",
                tableName: "ott_urls",
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.OttUrl.belongsTo(db.Ip, { foreignKey: 'ip_id', targetKey: 'ip_id' });
    }
}

module.exports = OttUrl;
