const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrdenCompra = sequelize.define('OrdenCompra', {
  NroOrdenC: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fechaEmision: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  total: { type: DataTypes.DECIMAL(10, 2) }
}, { timestamps: false });

module.exports = OrdenCompra;