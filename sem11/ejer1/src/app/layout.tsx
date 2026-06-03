import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ejercicio 1 - Componentes y Estilos",
  description: "CSS Modules y Tailwind CSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
