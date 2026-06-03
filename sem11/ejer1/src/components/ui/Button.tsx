import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = "button",
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`
        ${styles.button}
        ${styles[variant]}
        ${loading ? styles.loading : ""}
        ${disabled ? styles.disabled : ""}
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""}
        rounded-lg font-semibold text-white transition-all duration-300
      `}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className={styles.spinner}></span>
          Cargando...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
