import { HTMLAttributes, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Avatar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-200", className)} {...props} />;
}

export function AvatarImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img className="h-full w-full object-cover" {...props} />;
}

export function AvatarFallback({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex h-full w-full items-center justify-center text-sm font-bold", className)} {...props} />;
}
