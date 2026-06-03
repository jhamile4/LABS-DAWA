"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { courses, getCourseStats } from "@/lib/courses";

const stats = getCourseStats();

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f2] px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Resumen de cursos
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Panel construido con componentes Card, Button, Badge y Tabs.
            </p>
          </div>
          <Link href="/courses">
            <Button variant="outline">Ver cursos</Button>
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Total de cursos</CardDescription>
              <CardTitle>{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Cursos activos</CardDescription>
              <CardTitle>{stats.activos}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>En progreso</CardDescription>
              <CardTitle>{stats.enProgreso}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Finalizados</CardDescription>
              <CardTitle>{stats.finalizados}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="todos">
            {(activeTab, setActiveTab) => (
              <>
                <TabsList>
                  <TabsTrigger
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    value="todos"
                  >
                    Todos
                  </TabsTrigger>
                  <TabsTrigger
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    value="activos"
                  >
                    Activos
                  </TabsTrigger>
                  <TabsTrigger
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    value="finalizados"
                  >
                    Finalizados
                  </TabsTrigger>
                </TabsList>

                <TabsContent activeTab={activeTab} value="todos">
                  <CourseTable filter="Todos" />
                </TabsContent>
                <TabsContent activeTab={activeTab} value="activos">
                  <CourseTable filter="Activo" />
                </TabsContent>
                <TabsContent activeTab={activeTab} value="finalizados">
                  <CourseTable filter="Finalizado" />
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </section>
    </main>
  );
}

function CourseTable({ filter }: { filter: "Todos" | "Activo" | "Finalizado" }) {
  const visibleCourses =
    filter === "Todos"
      ? courses
      : courses.filter((course) => course.estado === filter);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Listado de cursos</CardTitle>
        <CardDescription>
          Informacion principal para seguimiento academico.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="py-3 pr-4 font-semibold">Curso</th>
                <th className="py-3 pr-4 font-semibold">Categoria</th>
                <th className="py-3 pr-4 font-semibold">Duracion</th>
                <th className="py-3 pr-4 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody>
              {visibleCourses.map((course) => (
                <tr className="border-b border-slate-100" key={course.id}>
                  <td className="py-4 pr-4 font-semibold text-slate-950">
                    {course.nombre}
                  </td>
                  <td className="py-4 pr-4 text-slate-600">
                    {course.categoria}
                  </td>
                  <td className="py-4 pr-4 text-slate-600">
                    {course.duracion} horas
                  </td>
                  <td className="py-4 pr-4">
                    <Badge
                      variant={
                        course.estado === "Activo" ? "success" : "secondary"
                      }
                    >
                      {course.estado}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
