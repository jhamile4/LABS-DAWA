import Link from "next/link";

interface Pokemon {
  name: string;
  url: string;
}

async function getPokemonList(): Promise<Pokemon[]> {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20", {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data.results;
}

export default async function PokemonListPage() {
  const pokemonList = await getPokemonList();

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">
        Pokédex
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {pokemonList.map((pokemon, index) => {
          const id = index + 1;
          return (
            <Link href={`/pokemon/${id}`} key={pokemon.name}>
              <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  alt={pokemon.name}
                  width={96}
                  height={96}
                />
                <p className="capitalize font-semibold mt-2">{pokemon.name}</p>
                <p className="text-gray-400 text-sm">#{id}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="text-center mt-8">
        <Link href="/" className="text-red-500 hover:underline">← Volver al inicio</Link>
      </div>
    </main>
  );
}
