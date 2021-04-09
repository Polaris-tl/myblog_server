const {
    DataTypes
} = require('sequelize')
const sequelize = require('../sequelize')

const Tag = sequelize.define('tag', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
module.exports = Tag