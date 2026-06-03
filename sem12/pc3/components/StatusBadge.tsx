import { CourseStatus } from "@/lib/courses";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: CourseStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
        status === "Activo" && "bg-emerald-100 text-emerald-800",
        status === "En Progreso" && "bg-sky-100 text-sky-800",
        status === "Finalizado" && "bg-slate-200 text-slate-700",
      )}
    >
      {status}
    </span>
  );
}
