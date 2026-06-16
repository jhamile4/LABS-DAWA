import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full hover:shadow-md transition">
      <div className="relative h-48 w-full bg-gray-100">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={project.featured} // <-- AQUÍ: Carga las imágenes destacadas de inmediato sin esperar
          quality={75} // <-- AQUÍ: Baja un poquito el peso imperceptiblemente para volar en rendimiento
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="bg-gray-100 text-gray-800 text-xs px-2.5 py-0.5 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-auto block text-center bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition text-sm"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
}