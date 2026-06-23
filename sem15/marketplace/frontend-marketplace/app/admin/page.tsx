"use client";

import {
useEffect,
useState
}
from "react";

export default function Admin(){

const[
products,
setProducts
]=useState([]);

const[
nombre,
setNombre
]=useState("");

const[
precio,
setPrecio
]=useState("");

const[
descripcion,
setDescripcion
]=useState("");

async function load(){

const res=
await fetch(
"http://localhost:3001/api/products"
);

const data=
await res.json();

setProducts(
data
);

}

useEffect(()=>{

load();

},[]);

async function create(){

await fetch(

"http://localhost:3001/api/products",

{

method:"POST",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify({

nombre,

precio:
Number(precio),

descripcion

})

}

);

load();

}

return(

<div
className="
p-10
"
>

<h1
className="
text-3xl
mb-5
"
>

Administrador

</h1>

<input

placeholder="Nombre"

className="
border
p-2
mb-3
block
"

onChange={
(e)=>
setNombre(
e.target.value
)
}

/>

<input

placeholder="Precio"

className="
border
p-2
mb-3
block
"

onChange={
(e)=>
setPrecio(
e.target.value
)
}

/>

<input

placeholder="Descripcion"

className="
border
p-2
mb-3
block
"

onChange={
(e)=>
setDescripcion(
e.target.value
)
}

/>

<button

onClick={
create
}

className="
bg-blue-500
text-white
p-3
"

>

Crear

</button>

<div
className="
mt-10
"
>

{

products.map(
(p:any)=>(

<div
key={p.id}
className="
border
p-4
mb-3
"
>

{p.nombre}

</div>

)

)

}

</div>

</div>

);

}