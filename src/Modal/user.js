const {
    DataTypes
} = require('sequelize')
const sequelize = require('../sequelize')


const User = sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('1', '2'),
        defaultValue: '2'
    },
    email: {
        type: DataTypes.STRING,
    },
    motto: {
        type: DataTypes.STRING,
    },
    avatar: {
        type: DataTypes.STRING,
    },
    github: {
        type: DataTypes.STRING,
    },
    csdn: {
        type: DataTypes.STRING,
    },
    juejin: {
        type: DataTypes.STRING,
    },
    jianshu: {
        type: DataTypes.STRING,
    },
})
module.exports = User