"use client";

import { ButtonHTMLAttributes, HTMLAttributes, ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

type TabsProps = {
  defaultValue: string;
  children: (activeTab: string, setActiveTab: (value: string) => void) => ReactNode;
};

export function Tabs({ defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return <div>{children(activeTab, setActiveTab)}</div>;
}

export function TabsList({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-flex rounded-lg bg-slate-100 p-1 text-slate-600",
        className,
      )}
      {...props}
    />
  );
}

type TabsTriggerProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
  activeTab: string;
  setActiveTab: (value: string) => void;
};

export function TabsTrigger({
  activeTab,
  children,
  className,
  setActiveTab,
  value,
  ...props
}: TabsTriggerProps) {
  const isActive = activeTab === value;

  return (
    <button
      className={cn(
        "rounded-md px-4 py-2 text-sm font-medium transition",
        isActive ? "bg-white text-slate-950 shadow-sm" : "hover:text-slate-950",
        className,
      )}
      onClick={() => setActiveTab(value)}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

type TabsContentProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
  activeTab: string;
};

export function TabsContent({
  activeTab,
  children,
  className,
  value,
  ...props
}: TabsContentProps) {
  if (activeTab !== value) {
    return null;
  }

  return (
    <div className={cn("mt-6", className)} {...props}>
      {children}
    </div>
  );
}
