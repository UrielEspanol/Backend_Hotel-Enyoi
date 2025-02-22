const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Reservation = sequelize.define('Reservation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    hotelId: { type: DataTypes.INTEGER, allowNull: false },
    guest_name: { type: DataTypes.STRING, allowNull: false },
    phone_number: { type: DataTypes.STRING, allowNull: false },
    check_in: { type: DataTypes.DATE, allowNull: false },
    check_out: { type: DataTypes.DATE, allowNull: false }
});
module.exports = Reservation;
