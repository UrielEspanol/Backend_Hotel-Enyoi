const { sequelize } = require('../config/database');
const User = require('./user');
const Hotel = require('./hotel');
const Reservation = require('./reservation');

User.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false }
    },
    { sequelize, modelName: 'User' }
);

module.exports = { User, Hotel, Reservation };
