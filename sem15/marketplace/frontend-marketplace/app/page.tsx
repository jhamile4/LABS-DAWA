import Link from "next/link";

async function getProducts() {

const res =
await fetch(
"http://localhost:3001/api/products",
{
cache:"no-store"
}
);

return res.json();

}

export default async function Home(){

const products =
await getProducts();

return(

<div className="p-10">

<h1 className="text-3xl mb-5">

Mini Marketplace

</h1>

<div className="mb-5">

<a
href="/"
className="mr-3"
>

Todos

</a>

</div>

{

products.map(
(product:any)=>(

<div

key={product.id}

className="
border
p-5
mb-5
"

>

<Link
href={`/products/${product.id}`}
>

<img

src={
product.imageUrl
||

"https://picsum.photos/300"
}

width="250"

alt="producto"

/>

<h2>

{product.nombre}

</h2>

</Link>

<p>

Precio:
S/
{product.precio}

</p>

<p>

{product.descripcion}

</p>

<p>

Categoría:
{

product.categoryId===1
?

"Tecnologia"

:

product.categoryId===2
?

"Accesorios"

:

"General"

}

</p>

</div>

)

)

}

</div>

);

}