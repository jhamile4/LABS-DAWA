import Link from 'next/link';
import { personalInfo } from '@/lib/data';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-900">
          {personalInfo.name}
        </Link>
        <nav className="flex gap-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600 transition">Inicio</Link>
          <Link href="/projects" className="text-gray-600 hover:text-blue-600 transition">Proyectos</Link>
          <Link href="/about" className="text-gray-600 hover:text-blue-600 transition">Sobre Mí</Link>
          <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition">Contacto</Link>
        </nav>
      </div>
    </header>
  );
}