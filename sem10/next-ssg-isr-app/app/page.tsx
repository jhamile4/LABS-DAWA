import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 flex flex-col items-center justify-center gap-8 px-4">
      <h1 className="text-5xl font-bold text-white">Mis Apps</h1>
      <div className="flex flex-col sm:flex-row gap-6">
        <Link href="/pokemon">
          <div className="bg-red-600 hover:bg-red-500 transition-colors rounded-2xl shadow-lg p-8 flex flex-col items-center gap-3 cursor-pointer w-56">
            <span className="text-5xl">🔴</span>
            <span className="text-white text-2xl font-bold">Pokédex</span>
          </div>
        </Link>
        <Link href="/rickandmorty">
          <div className="bg-green-700 hover:bg-green-600 transition-colors rounded-2xl shadow-lg p-8 flex flex-col items-center gap-3 cursor-pointer w-56">
            <span className="text-5xl">🛸</span>
            <span className="text-white text-2xl font-bold">Rick & Morty</span>
          </div>
        </Link>
      </div>
    </main>
  );
}
