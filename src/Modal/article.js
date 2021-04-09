const {
    DataTypes
} = require('sequelize')
const sequelize = require('../sequelize')

const Article = sequelize.define('article', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    isHot: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categories',
            key: 'id',
        },
    },
    visitNum: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
})

module.exports = Article