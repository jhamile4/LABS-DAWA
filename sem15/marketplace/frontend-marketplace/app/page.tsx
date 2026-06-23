import Link from "next/link";

async function getProducts() {

const res = await fetch(
"http://localhost:3001/api/products",
{
cache: "no-store"
}
);

return res.json();

}

export default async function Home() {

const products =
await getProducts();

return (

<div className="p-10">

<h1
className="
text-3xl
mb-5
"
>

Productos

</h1>

{

products.map(
(product:any)=>(

<Link
href={`/products/${product.id}`}
key={product.id}
>

<div
className="
border
p-5
mb-5
cursor-pointer
"
>

<h2>

{product.nombre}

</h2>

<p>

S/
{product.precio}

</p>

<p>

{product.descripcion}

</p>

</div>

</Link>

)

)

}

</div>

);

}