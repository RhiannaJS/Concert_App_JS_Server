const Sequelize = require("sequelize")

const sequelize = new Sequelize("postgres://postgres:be57a316870d4cc0a420b6fac69a52ab@localhost:5432/my-concert-app")

module.exports = sequelize