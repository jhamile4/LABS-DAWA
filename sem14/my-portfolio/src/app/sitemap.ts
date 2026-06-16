import { MetadataRoute } from 'next';
import { projects, personalInfo } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = personalInfo.siteUrl;

  // Rutas estáticas de la aplicación
  const staticRoutes = ['', '/projects', '/about', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Rutas dinámicas de los proyectos
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}