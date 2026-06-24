require("dotenv").config();

const app = require("./app");

const sequelize =
require("./config/database");

require("./models/User");
require("./models/Product");
require("./models/Category");

const PORT =
process.env.PORT || 10000;

// LEVANTAR SERVIDOR PRIMERO
app.listen(

PORT,

()=>{

console.log(
`Servidor corriendo en ${PORT}`
);

connectDB();

}

);

// CONECTAR BD DESPUES
async function connectDB(){

try{

await sequelize.authenticate();

console.log(
"MYSQL conectado"
);

await sequelize.sync();

console.log(
"Tablas listas"
);

}

catch(error){

console.log(
"Error BD:"
);

console.log(
error
);

}

}