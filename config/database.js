const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tu_hotel_db', 'root', 'Ur1032438105**', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = { sequelize };
