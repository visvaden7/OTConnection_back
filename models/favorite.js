const Sequelize = require("sequelize");

class Favorite extends Sequelize.Model {
    static initiate(sequelize) {
        Favorite.init(
            {
                favorite_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                user_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                ip_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                modelName: "Favorite",
                tableName: "favorites",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        db.Favorite.belongsTo(db.User,{foreignKey:"user_id", sourceKey:"id"})
        db.Favorite.belongsTo(db.Ip, {foreignKey:"ip_id", sourceKey: "ip_id"})
    }
}

module.exports = Favorite;
