import React from "react";

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  image?: string;
  footer?: React.ReactNode;
  hover?: boolean;
  className?: string;
}

export default function Card({
  children,
  title,
  subtitle,
  image,
  footer,
  hover = true,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        overflow-hidden rounded-xl bg-white shadow-md
        ${hover ? "hover:-translate-y-1 hover:shadow-xl" : ""}
        transition-all duration-300
        ${className}
      `}
    >
      {image && (
        <div className="h-48 overflow-hidden">
          <img
            alt={title || "Card image"}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
            src={image}
          />
        </div>
      )}

      <div className="p-6">
        {(title || subtitle) && (
          <div className="mb-4">
            {title && <h3 className="mb-2 text-2xl font-bold text-gray-800">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
        )}
        <div className="text-gray-600">{children}</div>
      </div>

      {footer && <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">{footer}</div>}
    </div>
  );
}
