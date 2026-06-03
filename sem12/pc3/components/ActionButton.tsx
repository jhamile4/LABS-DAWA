import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  loading?: boolean;
};

export function ActionButton({
  children,
  className,
  disabled,
  loading = false,
  variant = "primary",
  ...props
}: ActionButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-semibold transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "bg-teal-700 text-white hover:bg-teal-800",
        variant === "secondary" &&
          "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100",
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Cargando..." : children}
    </button>
  );
}
