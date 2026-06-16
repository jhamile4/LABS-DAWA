import { personalInfo } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
      <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} {personalInfo.name}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}