import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen p-8">
      <section className="mx-auto max-w-4xl rounded-lg bg-white p-10 shadow">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">
          Tarea Semana 11
        </p>
        <h1 className="mt-3 text-4xl font-black">Dashboard CRUD</h1>
        <p className="mt-3 text-slate-600">
          Implementacion completa con proyectos, equipo, tareas, configuracion,
          alertas, calendario, spinner y paginacion.
        </p>
        <Link
          className="mt-8 inline-flex rounded-md bg-emerald-700 px-5 py-3 font-semibold text-white"
          href="/dashboard"
        >
          Abrir dashboard
        </Link>
      </section>
    </main>
  );
}
