const {
DataTypes
}=
require(
"sequelize"
);

const sequelize =
require(
"../config/database"
);

const Product =
sequelize.define(

"Product",

{

nombre:{
type:
DataTypes.STRING
},

precio:{
type:
DataTypes.FLOAT
},

descripcion:{
type:
DataTypes.TEXT
},

imageUrl:{
type:
DataTypes.STRING,
allowNull:true
},

categoryId:{
type:
DataTypes.INTEGER,
allowNull:true
}

},

{
timestamps:true
}

);

module.exports =
Product;