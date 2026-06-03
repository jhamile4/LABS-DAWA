import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ejercicio 2 - Dashboard",
  description: "Dashboard de proyectos con componentes tipo shadcn/ui",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
