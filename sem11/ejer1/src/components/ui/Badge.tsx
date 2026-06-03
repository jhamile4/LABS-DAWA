import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "error" | "warning" | "info" | "neutral";
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
}

export default function Badge({
  children,
  variant = "neutral",
  size = "md",
  rounded = false,
}: BadgeProps) {
  const variantClasses = {
    success: "border-green-200 bg-green-100 text-green-800",
    error: "border-red-200 bg-red-100 text-red-800",
    warning: "border-yellow-200 bg-yellow-100 text-yellow-800",
    info: "border-blue-200 bg-blue-100 text-blue-800",
    neutral: "border-gray-200 bg-gray-100 text-gray-800",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <span
      className={`
        inline-flex items-center border font-semibold
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${rounded ? "rounded-full" : "rounded-md"}
      `}
    >
      {children}
    </span>
  );
}
