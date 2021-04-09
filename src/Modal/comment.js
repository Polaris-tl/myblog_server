const {
    DataTypes
} = require('sequelize')
const sequelize = require('../sequelize')

const Comment = sequelize.define('comment', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUID
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        }
    },
    articleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'articles',
            key: 'id',
        }
    },
    pId: {
        type: DataTypes.UUID,
        references: {
            model: 'comments',
            key: 'id',
        }
    },
    replyTo: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id',
        }
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
})

module.exports = Comment