require("dotenv").config();

const app = require("./app");

const sequelize =
require("./config/database");

require("./models/User");
require("./models/Product");
require("./models/Category");

async function start(){

try{

await sequelize.authenticate();

console.log(
"MYSQL conectado"
);

await sequelize.sync();

console.log(
"Tablas listas"
);

const PORT =
process.env.PORT
||
10000;

app.listen(

PORT,

()=>{

console.log(
`Servidor corriendo en ${PORT}`
);

}

);

}

catch(error){

console.log(error);

}

}

start();