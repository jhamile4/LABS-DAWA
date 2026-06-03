import Link from "next/link";
import { ActionButton } from "@/components/ActionButton";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f7f2] px-5 py-10 text-slate-950">
      <section className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            TechSolutions
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            Gestion de cursos tecnologicos
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Proyecto PC3 con componentes reutilizables, Tailwind CSS,
            dashboard y API Routes en Next.js.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/courses">
              <ActionButton>Ver cursos</ActionButton>
            </Link>
            <Link href="/dashboard">
              <ActionButton variant="secondary">Abrir dashboard</ActionButton>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
