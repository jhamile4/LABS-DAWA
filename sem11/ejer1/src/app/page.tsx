import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-4xl rounded-2xl bg-white p-10 shadow-lg">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
          Ejercicio 1
        </p>
        <h1 className="mt-4 text-4xl font-black">Componentes reutilizables</h1>
        <p className="mt-3 text-gray-600">
          Demostracion de CSS Modules para animaciones complejas y Tailwind CSS
          para layout, colores y responsive.
        </p>
        <Link
          href="/styling"
          className="mt-8 inline-flex rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white"
        >
          Abrir /styling
        </Link>
      </section>
    </main>
  );
}
