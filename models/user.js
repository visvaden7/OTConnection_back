const Sequelize = require("sequelize");

class User extends Sequelize.Model {
    static initiate(sequelize) {
        User.init(
            {
                email: {
                    type: Sequelize.STRING(40),
                    allowNull: true,
                },
                nick: {
                    type: Sequelize.STRING(15),
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                provider: {
                    type: Sequelize.ENUM("local", "google", "kakao", "naver"),
                    allowNull: true,
                    defaultValue: "local"
                },
                avatar: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
                snsId: {
                    type: Sequelize.STRING(250),
                    allowNull: false,
                },
                role: {
                    type: Sequelize.ENUM('admin', 'user'),
                    allowNull: false,
                    defaultValue: 'user'
                }
            },
            {
                sequelize,
                timestamps: true,
                modelName: "User",
                tableName: "users",
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
}

module.exports = User;
