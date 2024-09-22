const Sequelize = require("sequelize")

class Comments extends Sequelize.Model {
    static initiate(sequelize) {
        Comments.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                user_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                com_id: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                post_id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                parent_id: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: null,
                },
                avatarUrl: {
                    type: Sequelize.STRING(255),
                    allowNull: true,
                },
                userProfile: {
                    type: Sequelize.STRING(255),
                    allowNull: true,
                },
                fullName: {
                    type: Sequelize.STRING(255),
                    allowNull: false,
                },
                text: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                replies: {
                    type: Sequelize.JSON,
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                modelName: "Comments",
                tableName: "comments",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        )
    }

    static associate(db) {
        db.Comments.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'id'});
        // db.Comments.belongsTo(db.Post, { foreignKey: 'post_id', as: 'post' });
        db.Comments.hasMany(db.Comments, {foreignKey: 'parent_id', as: 'childComments'});
    }
}

module.exports = Comments
