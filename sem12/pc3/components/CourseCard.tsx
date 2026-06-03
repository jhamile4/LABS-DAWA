import { Course } from "@/lib/courses";
import { ActionButton } from "./ActionButton";
import { StatusBadge } from "./StatusBadge";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <img
        src={course.imagen}
        alt={course.nombre}
        className="h-48 w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">
              {course.categoria}
            </p>
            <h2 className="mt-2 text-xl font-bold text-slate-950">
              {course.nombre}
            </h2>
          </div>
          <StatusBadge status={course.estado} />
        </div>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
          {course.descripcion}
        </p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-slate-700">
            {course.duracion} horas
          </span>
          <ActionButton>Ver Detalles</ActionButton>
        </div>
      </div>
    </article>
  );
}
