import { FaWeight, FaRulerVertical } from "react-icons/fa";

interface PokemonDetail {
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

async function getPokemon(id: string): Promise<PokemonDetail> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
    next: { revalidate: 60 },
  });
  return res.json();
}

export async function generateStaticParams() {
  return Array.from({ length: 20 }, (_, i) => ({ id: String(i + 1) }));
}

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pokemon = await getPokemon(id);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold capitalize text-red-600 mb-4">
        {pokemon.name}
      </h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width={160}
        height={160}
        className="mb-4"
      />
      <div className="bg-white rounded-xl shadow p-6 w-full max-w-md">
        <div className="flex justify-around mb-4">
          <span className="flex items-center gap-2 text-gray-700">
            <FaWeight /> {pokemon.weight / 10} kg
          </span>
          <span className="flex items-center gap-2 text-gray-700">
            <FaRulerVertical /> {pokemon.height / 10} m
          </span>
        </div>
        <div className="flex gap-2 justify-center mb-4">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold capitalize"
            >
              {t.type.name}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-bold mb-2">Stats</h2>
        {pokemon.stats.map((s) => (
          <div key={s.stat.name} className="mb-2">
            <div className="flex justify-between text-sm capitalize mb-1">
              <span>{s.stat.name}</span>
              <span>{s.base_stat}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{ width: `${Math.min(s.base_stat, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <a href="/pokemon" className="mt-6 text-red-500 hover:underline">
        ← Volver a la Pokédex
      </a>
    </main>
  );
}
