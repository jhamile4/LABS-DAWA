export type CourseStatus = "Activo" | "En Progreso" | "Finalizado";

export type Course = {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  duracion: number;
  estado: CourseStatus;
  imagen: string;
};

export const courses: Course[] = [
  {
    id: 1,
    nombre: "React Avanzado",
    descripcion: "Construccion de interfaces modernas con hooks, rutas y patrones reutilizables.",
    categoria: "Frontend",
    duracion: 40,
    estado: "Activo",
    imagen:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    nombre: "Next.js Full Stack",
    descripcion: "Aplicaciones con App Router, Server Components, API Routes y despliegue.",
    categoria: "Full Stack",
    duracion: 48,
    estado: "En Progreso",
    imagen:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    nombre: "Node.js Backend",
    descripcion: "APIs REST, validaciones, arquitectura por capas y conexion con datos.",
    categoria: "Backend",
    duracion: 36,
    estado: "Activo",
    imagen:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    nombre: "Tailwind CSS",
    descripcion: "Diseno responsive con utilidades, componentes y sistemas visuales consistentes.",
    categoria: "Diseno Web",
    duracion: 24,
    estado: "Finalizado",
    imagen:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    nombre: "Python para Datos",
    descripcion: "Analisis de informacion, graficos y automatizacion con herramientas modernas.",
    categoria: "Data",
    duracion: 42,
    estado: "En Progreso",
    imagen:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    nombre: "UX para Productos Digitales",
    descripcion: "Investigacion, prototipado y pruebas para crear experiencias centradas en usuarios.",
    categoria: "UX/UI",
    duracion: 30,
    estado: "Finalizado",
    imagen:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=900&q=80",
  },
];

export const getCourseStats = () => ({
  total: courses.length,
  activos: courses.filter((course) => course.estado === "Activo").length,
  enProgreso: courses.filter((course) => course.estado === "En Progreso").length,
  finalizados: courses.filter((course) => course.estado === "Finalizado").length,
});
