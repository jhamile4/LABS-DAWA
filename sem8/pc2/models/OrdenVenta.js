const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrdenVenta = sequelize.define('OrdenVenta', {
  NroOrdenVta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fechaEmisión: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  total: { type: DataTypes.DECIMAL(10, 2) }
}, { timestamps: false });

module.exports = OrdenVenta;