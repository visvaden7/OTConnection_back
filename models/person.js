const Sequelize = require("sequelize");

class Person extends Sequelize.Model {
    static initiate(sequelize) {
        Person.init(
            {
                people_id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: Sequelize.STRING(50),
                    allowNull: true,
                },
                birth_date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                role: {
                    type: Sequelize.STRING(50),
                },
                brief_history: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
                profile_image: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                modelName: "Person",
                tableName: "person",
                paranoid: true,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
        // N:M 관계 설정을 위해 중간 테이블과 관계 설정 필요
        db.Person.belongsToMany(db.Ip, {
            through: 'IpPerson',
            foreignKey: 'people_id',
            otherKey: 'ip_id',
        });
    }
}

module.exports = Person;
