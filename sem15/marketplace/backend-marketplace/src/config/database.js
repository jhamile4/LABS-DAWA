const { Sequelize } = require("sequelize");

require("dotenv").config();

const sequelize = new Sequelize(
process.env.DB_NAME,
process.env.DB_USER,
process.env.DB_PASSWORD,
{
host: process.env.DB_HOST,

port: Number(
process.env.DB_PORT
),

dialect: "mysql",

dialectOptions: {
ssl: {
rejectUnauthorized: false
}
},

pool: {
max: 5,
min: 0,
acquire: 90000,
idle: 10000
},

retry: {
max: 3
},

logging: false
}
);

module.exports = sequelize;