const {
    DataTypes
} = require('sequelize')
const sequelize = require('../sequelize')


const TagArticle = sequelize.define('tagArticle', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    tagId: {
        type: DataTypes.UUID,
        references: {
            model: 'tags',
            key: 'id'
        },
        allowNull: false
    },
    articleId: {
        type: DataTypes.UUID,
        references: {
            model: 'articles',
            key: 'id'
        },
        allowNull: false
    }
})

module.exports = TagArticle