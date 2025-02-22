const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Hotel = sequelize.define('Hotel', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    price_per_night: { type: DataTypes.FLOAT, allowNull: false },
    amenities: { type: DataTypes.STRING, allowNull: false }
});
module.exports = Hotel;
