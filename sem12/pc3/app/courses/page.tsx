import Link from "next/link";
import { ActionButton } from "@/components/ActionButton";
import { CourseCard } from "@/components/CourseCard";
import { courses } from "@/lib/courses";

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f2] px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              TechSolutions
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Cursos tecnologicos
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Catalogo responsive con componentes reutilizables, imagenes,
              estados y acciones para cada curso.
            </p>
          </div>
          <Link href="/dashboard">
            <ActionButton variant="secondary">Ver dashboard</ActionButton>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <CourseCard course={course} key={course.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
