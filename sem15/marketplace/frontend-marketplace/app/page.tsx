import Link from "next/link";

async function getProducts(){

const res =
await fetch(

`${process.env.NEXT_PUBLIC_API_URL}/api/products`,

{
cache:"no-store"
}

);

const data =
await res.json();

return data;

}

export default async function Home(){

const products =
await getProducts();

return(

<div className="p-10">

<h1 className="text-3xl mb-5">

Mini Marketplace

</h1>

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

{product.nombre}</h2>

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

Categoria:
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