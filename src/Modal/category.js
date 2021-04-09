const {
    DataTypes
} = require('sequelize')
const sequelize = require('../sequelize')

const Category = sequelize.define('category', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

module.exports = Category