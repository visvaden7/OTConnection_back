const Sequelize = require('sequelize')

class Post extends Sequelize.Model {
    static initiate(sequelize) {
        Post.init(
            {
                post_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                ip_id: {
                    type: Sequelize.INTEGER,
                    allowNull: true
                },
                com_id: {
                    type: Sequelize.INTEGER,
                    allowNull: true
                },
                virtual_casting_id: {
                    type: Sequelize.INTEGER,
                    allowNull: true
                },
                type: {
                    type: Sequelize.STRING,
                    allowNull: false
                },
            }, {
                sequelize,
                timestamps: true,
                modelName: "Post",
                tableName: "post",
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        )
    }
    static associate(db) {
        db.Post.hasMany(db.Comments,{foreignKey:"post_id", sourceKey:"post_id"})
        db.Post.hasMany(db.VirtualCasting,{foreignKey:"virtual_casting_id", sourceKey:"virtual_casting_id"})
        db.Post.hasMany(db.Ip, {foreignKey: "ip_id", sourceKey: "ip_id"})
    }
}

module.exports = Post;