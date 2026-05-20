import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mis Apps",
  description: "Pokédex y Rick & Morty con Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
