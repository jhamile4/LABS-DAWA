const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Medicamento = sequelize.define('Medicamento', {
  CodMedicamento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcionMed: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0 // Importante para la lógica de stock [cite: 40, 45]
  },
  precioVentaUni: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  fechaVencimiento: {
    type: DataTypes.DATEONLY
  }
}, {
  timestamps: false // Para que no cree columnas de fecha automáticas si no las pediste
});

module.exports = Medicamento;