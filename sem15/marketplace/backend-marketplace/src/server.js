require("dotenv").config();

const app =
require("./app");

const sequelize =
require("./config/database");

/*
IMPORTAR MODELOS
*/

require("./models/Product");

require("./models/Category");

require("./models/User");

async function start(){

try{

await sequelize.authenticate();

console.log(
"MYSQL conectado"
);

await sequelize.sync({
alter:true
});

console.log(
"Tablas listas"
);

app.listen(

3001,

()=>{

console.log(
"http://localhost:3001"
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