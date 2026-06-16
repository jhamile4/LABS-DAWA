import { Project } from '@/types';

export const projects: Project[] = [
  {
    slug: 'ecommerce-platform',
    title: 'E-commerce Platform',
    description: 'Plataforma de comercio electrónico con Next.js, Stripe y PostgreSQL',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=928&auto=format&fit=crop',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/usuario/ecommerce',
    featured: true,
  },
  {
    slug: 'task-manager',
    title: 'Task Manager App',
    description: 'Aplicación de gestión de tareas con autenticación y tiempo real',
    // NUEVA IMAGEN: Checklist súper ligero e indexado globalmente en Unsplash
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1000&auto=format&fit=crop', 
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    demoUrl: 'https://tasks.example.com',
    githubUrl: 'https://github.com/usuario/task-manager',
    featured: true,
  },
  {
    slug: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'Dashboard interactivo del clima con gráficos y pronósticos',
    image: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2106&auto=format&fit=crop',
    technologies: ['Next.js', 'Chart.js', 'OpenWeather API'],
    githubUrl: 'https://github.com/usuario/weather-app',
    featured: false,
  },
];

export const personalInfo = {
  name: 'Jhamile Macavilca',
  title: 'Full Stack Developer',
  description: 'Desarrollador apasionado por crear experiencias web excepcionales',
  email: 'jhami@email.com',
  github: 'https://github.com/jhami',
  linkedin: 'https://linkedin.com/in/jhami',
  siteUrl: 'https://tuportafolio.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop',
};