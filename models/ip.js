const Sequelize = require("sequelize");

class Ip extends Sequelize.Model {
    static initiate(sequelize) {
        Ip.init(
            {
                ip_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                title: {
                    type: Sequelize.STRING(40),
                    allowNull: false,
                },
                webtoon_title: {
                    type: Sequelize.STRING(40),
                    allowNull: false,
                },
                ott_platform: {
                    type: Sequelize.STRING(40),
                    allowNull: true,
                },
                webtoon_platform: {
                    type: Sequelize.STRING(40),
                    allowNull: true,
                },
                webnovel_platform: {
                    type: Sequelize.STRING(40),
                    allowNull: true,
                },
                webnovel_chapter: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 0
                },
                webtoon_chapter: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 0
                },
                genre: {
                    type: Sequelize.STRING(150),
                    allowNull: true,
                },
                webtoon_start_date: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
                webtoon_end_date: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
                webnovel_start_date: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
                webnovel_end_date: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },
                update_cycle: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                rating: {
                    type: Sequelize.FLOAT,
                    allowNull: true,
                },
                total_views: {
                    type: Sequelize.BIGINT,
                    allowNull: true,
                },
                likes: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                interest: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                comments: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                },
                imdb_rating: {
                    type: Sequelize.FLOAT,
                    allowNull: true,
                },
                watch_time: {
                    type: Sequelize.BIGINT,
                    allowNull: true,
                },
                production: {
                    type: Sequelize.STRING,
                    allowNull: true,
                },
                release_date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                ott_profile_link: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                webtoon_profile_link: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
                webnovel_profile_link: {
                    type: Sequelize.STRING,
                    allowNull: true
                },
            },
            {
                sequelize,
                timestamps: true,
                modelName: "Ip",
                tableName: "ip",
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.Ip.hasMany(db.OttUrl,{foreignKey:"ip_id", sourceKey:"ip_id"})
        db.Ip.hasMany(db.Trends, {foreignKey:"ip_id", sourceKey: "ip_id"})

        db.Ip.belongsToMany(db.Person, {
            through: 'IpPerson',
            foreignKey: 'ip_id',
            otherKey: 'people_id',
        });
    }
}

module.exports = Ip;
