import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tarea Semana 11",
  description: "Dashboard con CRUD, alert, spinner, calendar y pagination",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
