import Link from "next/link";

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
  episode: string[];
}

async function getCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
    next: { revalidate: 60 },
  });
  return res.json();
}

export async function generateStaticParams() {
  return Array.from({ length: 20 }, (_, i) => ({ id: String(i + 1) }));
}

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const char = await getCharacter(id);

  return (
    <main className="min-h-screen bg-green-950 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-green-400 mb-4">{char.name}</h1>
      <img
        src={char.image}
        alt={char.name}
        width={200}
        height={200}
        className="rounded-full border-4 border-green-400 mb-6"
      />
      <div className="bg-green-900 rounded-xl shadow p-6 w-full max-w-md text-white">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-green-400 text-sm">Estado</p>
            <p className="font-semibold">{char.status}</p>
          </div>
          <div>
            <p className="text-green-400 text-sm">Especie</p>
            <p className="font-semibold">{char.species}</p>
          </div>
          <div>
            <p className="text-green-400 text-sm">Género</p>
            <p className="font-semibold">{char.gender}</p>
          </div>
          <div>
            <p className="text-green-400 text-sm">Episodios</p>
            <p className="font-semibold">{char.episode.length}</p>
          </div>
        </div>
        <div className="mb-2">
          <p className="text-green-400 text-sm">Origen</p>
          <p className="font-semibold">{char.origin.name}</p>
        </div>
        <div>
          <p className="text-green-400 text-sm">Última ubicación</p>
          <p className="font-semibold">{char.location.name}</p>
        </div>
      </div>
      <Link href="/rickandmorty" className="mt-6 text-green-400 hover:underline">
        ← Volver a Rick & Morty
      </Link>
    </main>
  );
}
