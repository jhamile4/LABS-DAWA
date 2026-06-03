"use client";

import { ButtonHTMLAttributes, HTMLAttributes, ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

export function Tabs({
  children,
  defaultValue,
}: {
  defaultValue: string;
  children: (value: string, setValue: (value: string) => void) => ReactNode;
}) {
  const [value, setValue] = useState(defaultValue);
  return <div>{children(value, setValue)}</div>;
}

export function TabsList({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("inline-flex rounded-lg bg-slate-100 p-1", className)} {...props} />;
}

export function TabsTrigger({
  active,
  className,
  setValue,
  value,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  active: string;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <button
      className={cn(
        "rounded-md px-4 py-2 text-sm font-medium transition",
        active === value ? "bg-white text-slate-950 shadow" : "text-slate-500 hover:text-slate-950",
        className,
      )}
      onClick={() => setValue(value)}
      type="button"
      {...props}
    />
  );
}

export function TabsContent({
  active,
  className,
  value,
  ...props
}: HTMLAttributes<HTMLDivElement> & { active: string; value: string }) {
  if (active !== value) return null;
  return <div className={cn("mt-4", className)} {...props} />;
}
