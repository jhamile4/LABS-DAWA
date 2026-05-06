const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Laboratorio = sequelize.define('Laboratorio', {
  CodLab: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  razonSocial: { type: DataTypes.STRING, allowNull: false },
  telefono: { type: DataTypes.STRING }
}, { timestamps: false });

module.exports = Laboratorio;