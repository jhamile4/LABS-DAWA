const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DetalleOrdenVta = sequelize.define('DetalleOrdenVta', {
  cantidadRequerida: { type: DataTypes.INTEGER, allowNull: false }
}, { timestamps: false });

module.exports = DetalleOrdenVta;