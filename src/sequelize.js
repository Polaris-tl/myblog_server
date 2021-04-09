const {
    Sequelize
} = require('sequelize')
const config = require('./config/dbConfig')
const sequelize = new Sequelize(config.DB_NAME, config.USERNAME, config.PASSWORD, config.OTHER);

module.exports = sequelize