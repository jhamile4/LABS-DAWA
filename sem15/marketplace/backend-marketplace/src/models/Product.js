const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },

    precio: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

    descripcion: {
      type: DataTypes.TEXT
    }
  },
  {
    timestamps: false
  }
);

module.exports = Product;