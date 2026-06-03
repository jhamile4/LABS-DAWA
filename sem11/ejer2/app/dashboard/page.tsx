"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { NewProject, ProjectForm } from "@/components/ProjectForm";
import { TaskTable } from "@/components/TaskTable";

type Project = {
  id: number;
  name: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  progress: number;
};

const initialProjects: Project[] = [
  { id: 1, name: "E-commerce Platform", description: "Tienda online con pagos", category: "web", priority: "high", status: "En progreso", progress: 72 },
  { id: 2, name: "Mobile App", description: "Aplicacion movil para clientes", category: "mobile", priority: "medium", status: "Pendiente", progress: 25 },
  { id: 3, name: "API Gateway", description: "Servicios backend centralizados", category: "web", priority: "high", status: "Completado", progress: 100 },
];

const team = [
  { name: "Maria Garcia", role: "Frontend", image: "https://i.pravatar.cc/80?img=1" },
  { name: "Carlos Ruiz", role: "Backend", image: "https://i.pravatar.cc/80?img=3" },
  { name: "Ana Lopez", role: "UX/UI", image: "https://i.pravatar.cc/80?img=5" },
];

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const addProject = (project: NewProject) => {
    setProjects([
      ...projects,
      {
        id: Date.now(),
        name: project.name,
        description: project.description || "Proyecto creado desde el formulario",
        category: project.category,
        priority: project.priority,
        status: "Pendiente",
        progress: 0,
      },
    ]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Dashboard de Proyectos</h1>
          <p className="mt-2 text-slate-600">Gestiona tus proyectos y tareas con shadcn/ui</p>
          <div className="pt-4"><ProjectForm onAddProject={addProject} /></div>
        </div>

        <Tabs defaultValue="overview">
          {(active, setActive) => (
            <>
              <TabsList className="flex flex-wrap">
                <TabsTrigger active={active} setValue={setActive} value="overview">Resumen</TabsTrigger>
                <TabsTrigger active={active} setValue={setActive} value="projects">Proyectos</TabsTrigger>
                <TabsTrigger active={active} setValue={setActive} value="team">Equipo</TabsTrigger>
                <TabsTrigger active={active} setValue={setActive} value="tasks">Tareas</TabsTrigger>
                <TabsTrigger active={active} setValue={setActive} value="settings">Configuracion</TabsTrigger>
              </TabsList>

              <TabsContent active={active} className="space-y-4" value="overview">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <StatCard label="Total Proyectos" value={String(projects.length)} />
                  <StatCard label="Tareas Activas" value="28" />
                  <StatCard label="Equipo" value="8" />
                  <StatCard label="Completados" value="5" />
                </div>
              </TabsContent>

              <TabsContent active={active} className="space-y-4" value="projects">
                <div className="grid gap-4 lg:grid-cols-3">
                  {projects.map((project) => (
                    <Card key={project.id}>
                      <CardHeader>
                        <CardTitle className="text-xl">{project.name}</CardTitle>
                        <CardDescription>
                          {project.status} - {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-3 flex flex-wrap gap-2">
                          <Badge variant="secondary">{project.category}</Badge>
                          <Badge>{project.priority}</Badge>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100">
                          <div className="h-2 rounded-full bg-slate-950" style={{ width: `${project.progress}%` }} />
                        </div>
                        <Button className="mt-4" size="sm" variant="outline">Ver detalles</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent active={active} value="team">
                <Card>
                  <CardHeader>
                    <CardTitle>Equipo</CardTitle>
                    <CardDescription>Miembros principales del proyecto.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-3">
                    {team.map((member) => (
                      <div className="flex items-center gap-3 rounded-lg border p-4" key={member.name}>
                        <Avatar>
                          <AvatarImage alt={member.name} src={member.image} />
                          <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{member.name}</p>
                          <Badge variant="secondary">{member.role}</Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent active={active} value="tasks">
                <Card>
                  <CardHeader>
                    <CardTitle>Gestion de Tareas</CardTitle>
                    <CardDescription>Administra todas las tareas de tus proyectos.</CardDescription>
                  </CardHeader>
                  <CardContent><TaskTable /></CardContent>
                </Card>
              </TabsContent>

              <TabsContent active={active} value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuracion</CardTitle>
                    <CardDescription>Seccion de configuracion simulada.</CardDescription>
                  </CardHeader>
                  <CardContent><p className="text-slate-500">Configuracion en desarrollo...</p></CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle>{value}</CardTitle>
      </CardHeader>
    </Card>
  );
}
