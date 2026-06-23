const User =
require("../models/User");

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

exports.register =
async (
req,
res
)=>{

try{

const {
nombre,
email,
password,
rol
}=
req.body;

const hash =
await bcrypt.hash(
password,
10
);

const user =
await User.create({

nombre,

email,

password:
hash,

rol

});

res.json(user);

}

catch(err){

console.log(err);

res
.status(500)
.json(err);

}

};

exports.login =
async (
req,
res
)=>{

try{

const {
email,
password
}=
req.body;

const user =
await User.findOne({

where:{
email
}

});

if(
!user
){

return res
.status(401)
.json({
message:
"Usuario no encontrado"
});

}

const valid =
await bcrypt.compare(
password,
user.password
);

if(
!valid
){

return res
.status(401)
.json({
message:
"Contraseña incorrecta"
});

}

const token =
jwt.sign(

{
id:user.id,
rol:user.rol
},

"secreto"

);

res.json({

token,

rol:
user.rol

});

}

catch(err){

console.log(err);

res
.status(500)
.json(err);

}

};