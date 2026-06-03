"use client";

import { HTMLAttributes, ReactNode } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export function Dialog({
  children,
  open,
}: {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <>
      {children}
      {open && <div className="fixed inset-0 z-40 bg-slate-950/40" />}
    </>
  );
}

export function DialogTrigger({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function DialogContent({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl", className)}>
      {children}
    </div>
  );
}

export function DialogHeader(props: HTMLAttributes<HTMLDivElement>) {
  return <div className="mb-4 space-y-1" {...props} />;
}
export function DialogTitle(props: HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className="text-xl font-bold" {...props} />;
}
export function DialogDescription(props: HTMLAttributes<HTMLParagraphElement>) {
  return <p className="text-sm text-slate-500" {...props} />;
}
export function DialogFooter({ children }: { children: ReactNode }) {
  return <div className="mt-5 flex justify-end gap-2">{children}</div>;
}
export function DialogCloseButton({ onClick }: { onClick: () => void }) {
  return <Button onClick={onClick} type="button" variant="outline">Cancelar</Button>;
}
