import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary" | "success";
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variant === "default" && "bg-slate-950 text-white",
        variant === "secondary" && "bg-slate-100 text-slate-700",
        variant === "success" && "bg-emerald-100 text-emerald-800",
        className,
      )}
      {...props}
    />
  );
}
