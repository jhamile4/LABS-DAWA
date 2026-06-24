require("dotenv").config();

const app =
require("./app");

const sequelize =
require("./config/database");

require("./models/Product");
require("./models/Category");
require("./models/User");

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
3001;

app.listen(

PORT,

()=>{

console.log(

`Servidor activo ${PORT}`

);

}

);

}

catch(error){

console.log(
error
);

}

}

start();