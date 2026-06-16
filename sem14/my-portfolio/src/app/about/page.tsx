import { Metadata } from 'next';
import { personalInfo } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Sobre Mí',
  description: 'Conoce más sobre mi trayectoria y experiencia como desarrollador web',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Sobre Mí</h1>
      <div className="prose text-gray-700 text-lg leading-relaxed space-y-4">
        <p>Hola, mi nombre es {personalInfo.name} y soy {personalInfo.title}.</p>
        <p>Me dedico al desarrollo de aplicaciones web ágiles, rápidas y totalmente optimizadas para motores de búsqueda (SEO) y excelente experiencia de usuario.</p>
        <p>Tengo experiencia manejando herramientas modernas del ecosistema de JavaScript y React como Next.js, Tailwind CSS y bases de datos relacionales y no relacionales.</p>
      </div>
    </div>
  );
}