const {
    DataTypes
} = require('sequelize')
const sequelize = require('../sequelize')

// 用户点赞  文章关联表
const UserFavouriteArticle = sequelize.define('userFavouriteArticle', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id'
        },
        unique: 'myUnique',
        allowNull: false
    },
    articleId: {
        type: DataTypes.UUID,
        references: {
            model: 'articles',
            key: 'id'
        },
        unique: 'myUnique',
        allowNull: false
    }
})
module.exports = UserFavouriteArticle