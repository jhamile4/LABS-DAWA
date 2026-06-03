import { NextResponse } from "next/server";
import { Course, courses } from "@/lib/courses";

let storedCourses: Course[] = [...courses];

export async function GET() {
  return NextResponse.json({
    message: "Lista de cursos obtenida correctamente",
    total: storedCourses.length,
    data: storedCourses,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.nombre || !body.categoria || !body.duracion) {
    return NextResponse.json(
      {
        message: "Faltan datos obligatorios: nombre, categoria y duracion",
      },
      { status: 400 },
    );
  }

  const newCourse: Course = {
    id: body.id ?? storedCourses.length + 1,
    nombre: body.nombre,
    descripcion: body.descripcion ?? "Curso registrado desde API Route.",
    categoria: body.categoria,
    duracion: Number(body.duracion),
    estado: body.estado ?? "Activo",
    imagen:
      body.imagen ??
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
  };

  storedCourses = [...storedCourses, newCourse];

  return NextResponse.json(
    {
      message: "Curso registrado correctamente",
      data: newCourse,
    },
    { status: 201 },
  );
}
