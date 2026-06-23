const jwt =
require(
"jsonwebtoken"
);

module.exports =
(
roles=[]
)=>
{

return(
req,
res,
next
)=>{

try{

const token =
req.headers.authorization
?.replace(
"Bearer ",
""
);

if(
!token
){

return res
.status(401)
.json({

message:
"No autorizado"

});

}

const decoded =
jwt.verify(
token,
"secreto"
);

req.user =
decoded;

if(

roles.length
&&

!roles.includes(
decoded.rol
)

){

return res
.status(403)
.json({

message:
"Sin permiso"

});

}

next();

}

catch{

res
.status(401)
.json({

message:
"Token inválido"

});

}

};

};