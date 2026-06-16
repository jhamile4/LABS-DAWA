import { Metadata } from 'next';
import { personalInfo } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Ponte en contacto conmigo para oportunidades laborales o proyectos web.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">Contacto</h1>
      <p className="text-gray-600 mb-8 text-center">¿Tienes un proyecto en mente? ¡Escríbeme!</p>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="space-y-4">
          <div>
            <span className="block font-semibold text-gray-700">Email:</span>
            <a href={`mailto:${personalInfo.email}`} className="text-blue-600 hover:underline">{personalInfo.email}</a>
          </div>
          <div>
            <span className="block font-semibold text-gray-700">GitHub:</span>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{personalInfo.github}</a>
          </div>
          <div>
            <span className="block font-semibold text-gray-700">LinkedIn:</span>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{personalInfo.linkedin}</a>
          </div>
        </div>
      </div>
    </div>
  );
}