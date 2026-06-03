import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen p-8">
      <section className="mx-auto max-w-4xl rounded-lg bg-white p-10 shadow">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
          Ejercicio 2
        </p>
        <h1 className="mt-3 text-4xl font-black">Dashboard de proyectos</h1>
        <p className="mt-3 text-slate-600">
          Componentes tipo shadcn/ui: Card, Button, Badge, Tabs, Avatar, Dialog,
          Select, Table y Checkbox.
        </p>
        <Link
          className="mt-8 inline-flex rounded-md bg-slate-950 px-5 py-3 font-semibold text-white"
          href="/dashboard"
        >
          Abrir dashboard
        </Link>
      </section>
    </main>
  );
}
