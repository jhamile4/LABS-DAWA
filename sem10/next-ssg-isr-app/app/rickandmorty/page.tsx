import Link from "next/link";

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
}

async function getCharacters(name: string = ""): Promise<Character[]> {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character?name=${name}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.results;
}

export default async function RickAndMortyPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const { name = "" } = await searchParams;
  const characters = await getCharacters(name);

  return (
    <main className="min-h-screen bg-green-950 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-green-400 mb-8">
        Rick & Morty
      </h1>

      <form method="GET" className="flex justify-center mb-8 gap-2">
        <input
          type="text"
          name="name"
          defaultValue={name}
          placeholder="Buscar personaje..."
          className="px-4 py-2 rounded-lg w-64 text-black"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400"
        >
          Buscar
        </button>
      </form>

      {characters.length === 0 ? (
        <p className="text-center text-green-300">No se encontraron personajes.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {characters.map((char) => (
            <Link href={`/rickandmorty/${char.id}`} key={char.id}>
              <div className="bg-green-900 rounded-xl shadow p-4 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer">
                <img
                  src={char.image}
                  alt={char.name}
                  width={96}
                  height={96}
                  className="rounded-full"
                />
                <p className="text-white font-semibold mt-2 text-center">{char.name}</p>
                <p className="text-green-400 text-sm">{char.species}</p>
                <span
                  className={`text-xs mt-1 px-2 py-0.5 rounded-full font-semibold ${
                    char.status === "Alive"
                      ? "bg-green-500 text-white"
                      : char.status === "Dead"
                      ? "bg-red-500 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {char.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
      <div className="text-center mt-8">
        <Link href="/" className="text-green-400 hover:underline">← Volver al inicio</Link>
      </div>
    </main>
  );
}
