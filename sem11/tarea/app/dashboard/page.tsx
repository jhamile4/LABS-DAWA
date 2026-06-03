"use client";

import { FormEvent, useMemo, useState } from "react";

type Project = {
  id: number;
  name: string;
  description: string;
  category: string;
  priority: string;
  teamMembers: string;
};

type Member = {
  userId: number;
  role: string;
  name: string;
  email: string;
  position: string;
  birthdate: string;
  phone: string;
  projectId: number;
  isActive: boolean;
};

type Task = {
  id: number;
  description: string;
  projectId: number;
  status: string;
  priority: string;
  userId: number;
  dateline: string;
};

type AlertState = {
  type: "success" | "error";
  message: string;
};

const initialProjects: Project[] = [
  { id: 1, name: "Portal Academico", description: "Sistema web para estudiantes", category: "Web", priority: "Alta", teamMembers: "1, 2" },
  { id: 2, name: "App Inventario", description: "Control de productos y stock", category: "Mobile", priority: "Media", teamMembers: "3" },
];

const initialMembers: Member[] = [
  { userId: 1, role: "admin", name: "Maria Garcia", email: "maria@mail.com", position: "Frontend", birthdate: "2000-04-12", phone: "999111222", projectId: 1, isActive: true },
  { userId: 2, role: "developer", name: "Carlos Ruiz", email: "carlos@mail.com", position: "Backend", birthdate: "1999-09-08", phone: "988222333", projectId: 1, isActive: true },
  { userId: 3, role: "designer", name: "Ana Lopez", email: "ana@mail.com", position: "UX/UI", birthdate: "2001-01-20", phone: "977333444", projectId: 2, isActive: false },
];

const initialTasks: Task[] = [
  { id: 1, description: "Crear login", projectId: 1, status: "En progreso", priority: "Alta", userId: 1, dateline: "2026-06-15" },
  { id: 2, description: "Disenar dashboard", projectId: 1, status: "Pendiente", priority: "Media", userId: 3, dateline: "2026-06-20" },
  { id: 3, description: "Conectar API", projectId: 2, status: "Completado", priority: "Urgente", userId: 2, dateline: "2026-06-12" },
  { id: 4, description: "Validar formularios", projectId: 1, status: "Pendiente", priority: "Baja", userId: 1, dateline: "2026-06-25" },
  { id: 5, description: "Preparar despliegue", projectId: 2, status: "En progreso", priority: "Alta", userId: 2, dateline: "2026-06-30" },
];

const emptyProject: Project = { id: 0, name: "", description: "", category: "Web", priority: "Media", teamMembers: "" };
const emptyMember: Member = { userId: 0, role: "developer", name: "", email: "", position: "", birthdate: "", phone: "", projectId: 1, isActive: true };
const emptyTask: Task = { id: 0, description: "", projectId: 1, status: "Pendiente", priority: "Media", userId: 1, dateline: "" };

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [projectForm, setProjectForm] = useState<Project>(emptyProject);
  const [memberForm, setMemberForm] = useState<Member>(emptyMember);
  const [taskForm, setTaskForm] = useState<Task>(emptyTask);
  const [settings, setSettings] = useState({ company: "TechSolutions", notifications: "Si", color: "Verde" });
  const [alert, setAlert] = useState<AlertState | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [page, setPage] = useState(1);

  const stats = useMemo(() => ({
    projects: projects.length,
    members: members.length,
    activeMembers: members.filter((member) => member.isActive).length,
    tasks: tasks.length,
    completed: tasks.filter((task) => task.status === "Completado").length,
  }), [members, projects, tasks]);

  const paginatedTasks = tasks.slice((page - 1) * 3, page * 3);
  const totalPages = Math.max(1, Math.ceil(tasks.length / 3));

  const showAlert = (nextAlert: AlertState) => {
    setAlert(nextAlert);
    window.setTimeout(() => setAlert(null), 2400);
  };

  const simulateBackend = (callback: () => void) => {
    setLoading(true);
    window.setTimeout(() => {
      callback();
      setLoading(false);
    }, 600);
  };

  const saveProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!projectForm.name.trim() || !projectForm.teamMembers.trim()) {
      showAlert({ type: "error", message: "Proyecto: nombre y miembros del equipo son obligatorios." });
      return;
    }
    simulateBackend(() => {
      if (projectForm.id) {
        setProjects(projects.map((project) => project.id === projectForm.id ? projectForm : project));
        showAlert({ type: "success", message: "Proyecto actualizado correctamente." });
      } else {
        setProjects([...projects, { ...projectForm, id: Date.now() }]);
        showAlert({ type: "success", message: "Proyecto creado correctamente." });
      }
      setProjectForm(emptyProject);
    });
  };

  const saveMember = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!memberForm.name.trim() || !memberForm.email.includes("@") || !memberForm.birthdate) {
      showAlert({ type: "error", message: "Equipo: complete nombre, correo valido y fecha de nacimiento." });
      return;
    }
    simulateBackend(() => {
      if (memberForm.userId) {
        setMembers(members.map((member) => member.userId === memberForm.userId ? memberForm : member));
        showAlert({ type: "success", message: "Miembro actualizado correctamente." });
      } else {
        setMembers([...members, { ...memberForm, userId: Date.now() }]);
        showAlert({ type: "success", message: "Miembro creado correctamente." });
      }
      setMemberForm({ ...emptyMember, projectId: projects[0]?.id ?? 1 });
    });
  };

  const saveTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!taskForm.description.trim() || !taskForm.dateline) {
      showAlert({ type: "error", message: "Tarea: descripcion y fecha limite son obligatorias." });
      return;
    }
    simulateBackend(() => {
      if (taskForm.id) {
        setTasks(tasks.map((task) => task.id === taskForm.id ? taskForm : task));
        showAlert({ type: "success", message: "Tarea actualizada correctamente." });
      } else {
        setTasks([...tasks, { ...taskForm, id: Date.now() }]);
        showAlert({ type: "success", message: "Tarea creada correctamente." });
      }
      setTaskForm({ ...emptyTask, projectId: projects[0]?.id ?? 1, userId: members[0]?.userId ?? 1 });
      setPage(1);
    });
  };

  return (
    <main className="min-h-screen bg-[#f3f7f4] px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 rounded-lg border border-emerald-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Tarea Semana 11</p>
            <h1 className="mt-2 text-3xl font-black">Dashboard de gestion</h1>
            <p className="mt-2 text-slate-600">CRUD en memoria con componentes tipo shadcn/ui, alertas, calendario, spinner y paginacion.</p>
          </div>
          <Spinner show={loading} />
        </header>

        {alert && <Alert type={alert.type}>{alert.message}</Alert>}

        <nav className="mb-6 flex flex-wrap gap-2 rounded-lg bg-emerald-900 p-2">
          {[
            ["overview", "Resumen"],
            ["projects", "Proyectos"],
            ["team", "Equipo"],
            ["tasks", "Tareas"],
            ["settings", "Configuracion"],
          ].map(([value, label]) => (
            <button
              className={`rounded-md px-4 py-2 text-sm font-semibold transition ${activeTab === value ? "bg-white text-emerald-900" : "text-white hover:bg-white/15"}`}
              key={value}
              onClick={() => setActiveTab(value)}
              type="button"
            >
              {label}
            </button>
          ))}
        </nav>

        {activeTab === "overview" && (
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <Stat label="Proyectos" value={stats.projects} />
            <Stat label="Miembros" value={stats.members} />
            <Stat label="Activos" value={stats.activeMembers} />
            <Stat label="Tareas" value={stats.tasks} />
            <Stat label="Completadas" value={stats.completed} />
          </section>
        )}

        {activeTab === "projects" && (
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Panel title={projectForm.id ? "Editar proyecto" : "Crear proyecto"} description="Incluye miembros del equipo y prioridad.">
              <form className="grid gap-3" onSubmit={saveProject}>
                <Input label="Nombre" onChange={(value) => setProjectForm({ ...projectForm, name: value })} value={projectForm.name} />
                <Input label="Descripcion" onChange={(value) => setProjectForm({ ...projectForm, description: value })} value={projectForm.description} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <SelectInput label="Categoria" onChange={(value) => setProjectForm({ ...projectForm, category: value })} options={["Web", "Mobile", "Diseno", "Datos"]} value={projectForm.category} />
                  <SelectInput label="Prioridad" onChange={(value) => setProjectForm({ ...projectForm, priority: value })} options={["Baja", "Media", "Alta", "Urgente"]} value={projectForm.priority} />
                </div>
                <Input label="Miembros del equipo" onChange={(value) => setProjectForm({ ...projectForm, teamMembers: value })} placeholder="Ejemplo: 1, 2, 3" value={projectForm.teamMembers} />
                <div className="flex gap-2">
                  <Button>{projectForm.id ? "Actualizar" : "Crear"} proyecto</Button>
                  <Button onClick={() => setProjectForm(emptyProject)} type="button" variant="secondary">Limpiar</Button>
                </div>
              </form>
            </Panel>
            <Panel title="Lista de proyectos" description="Botones para detalles, editar y eliminar.">
              <div className="grid gap-3">
                {projects.map((project) => (
                  <div className="rounded-lg border p-4" key={project.id}>
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="font-bold">{project.name}</h3>
                        <p className="text-sm text-slate-600">{project.description}</p>
                        <p className="mt-2 text-xs font-semibold text-emerald-700">Miembros: {project.teamMembers}</p>
                      </div>
                      <Badge>{project.priority}</Badge>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button onClick={() => setSelectedProject(project)} type="button" variant="secondary">Ver detalles</Button>
                      <Button onClick={() => setProjectForm(project)} type="button" variant="secondary">Editar</Button>
                      <Button onClick={() => setProjects(projects.filter((item) => item.id !== project.id))} type="button" variant="danger">Eliminar</Button>
                    </div>
                  </div>
                ))}
              </div>
              {selectedProject && (
                <div className="mt-4 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-950">
                  <strong>Detalle:</strong> {selectedProject.name} pertenece a {selectedProject.category}, prioridad {selectedProject.priority}.
                </div>
              )}
            </Panel>
          </section>
        )}

        {activeTab === "team" && (
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Panel title={memberForm.userId ? "Editar miembro" : "Crear miembro"} description="CRUD de miembros del equipo.">
              <form className="grid gap-3" onSubmit={saveMember}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input label="Nombre" onChange={(value) => setMemberForm({ ...memberForm, name: value })} value={memberForm.name} />
                  <Input label="Email" onChange={(value) => setMemberForm({ ...memberForm, email: value })} value={memberForm.email} />
                  <Input label="Cargo" onChange={(value) => setMemberForm({ ...memberForm, position: value })} value={memberForm.position} />
                  <Input label="Telefono" onChange={(value) => setMemberForm({ ...memberForm, phone: value })} value={memberForm.phone} />
                  <SelectInput label="Rol" onChange={(value) => setMemberForm({ ...memberForm, role: value })} options={["admin", "developer", "designer", "tester"]} value={memberForm.role} />
                  <SelectInput label="Proyecto" onChange={(value) => setMemberForm({ ...memberForm, projectId: Number(value) })} options={projects.map((project) => String(project.id))} value={String(memberForm.projectId)} />
                </div>
                <Calendar label="Fecha de nacimiento" onChange={(value) => setMemberForm({ ...memberForm, birthdate: value })} value={memberForm.birthdate} />
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <input checked={memberForm.isActive} onChange={(event) => setMemberForm({ ...memberForm, isActive: event.target.checked })} type="checkbox" />
                  Miembro activo
                </label>
                <div className="flex gap-2">
                  <Button>{memberForm.userId ? "Actualizar" : "Crear"} miembro</Button>
                  <Button onClick={() => setMemberForm(emptyMember)} type="button" variant="secondary">Limpiar</Button>
                </div>
              </form>
            </Panel>
            <Panel title="Miembros registrados" description="Editar o eliminar miembros.">
              <DataTable
                headers={["Nombre", "Rol", "Email", "Proyecto", "Activo", "Acciones"]}
                rows={members.map((member) => [
                  member.name,
                  member.role,
                  member.email,
                  String(member.projectId),
                  member.isActive ? "Si" : "No",
                  <Actions key={member.userId} onDelete={() => setMembers(members.filter((item) => item.userId !== member.userId))} onEdit={() => setMemberForm(member)} />,
                ])}
              />
            </Panel>
          </section>
        )}

        {activeTab === "tasks" && (
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Panel title={taskForm.id ? "Editar tarea" : "Crear tarea"} description="CRUD de tareas con fecha limite.">
              <form className="grid gap-3" onSubmit={saveTask}>
                <Input label="Descripcion" onChange={(value) => setTaskForm({ ...taskForm, description: value })} value={taskForm.description} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <SelectInput label="Proyecto" onChange={(value) => setTaskForm({ ...taskForm, projectId: Number(value) })} options={projects.map((project) => String(project.id))} value={String(taskForm.projectId)} />
                  <SelectInput label="Usuario" onChange={(value) => setTaskForm({ ...taskForm, userId: Number(value) })} options={members.map((member) => String(member.userId))} value={String(taskForm.userId)} />
                  <SelectInput label="Estado" onChange={(value) => setTaskForm({ ...taskForm, status: value })} options={["Pendiente", "En progreso", "Completado"]} value={taskForm.status} />
                  <SelectInput label="Prioridad" onChange={(value) => setTaskForm({ ...taskForm, priority: value })} options={["Baja", "Media", "Alta", "Urgente"]} value={taskForm.priority} />
                </div>
                <Calendar label="Fecha limite" onChange={(value) => setTaskForm({ ...taskForm, dateline: value })} value={taskForm.dateline} />
                <div className="flex gap-2">
                  <Button>{taskForm.id ? "Actualizar" : "Crear"} tarea</Button>
                  <Button onClick={() => setTaskForm(emptyTask)} type="button" variant="secondary">Limpiar</Button>
                </div>
              </form>
            </Panel>
            <Panel title="Tareas con paginacion" description="Se muestran 3 tareas por pagina.">
              <DataTable
                headers={["Descripcion", "Estado", "Prioridad", "Fecha", "Acciones"]}
                rows={paginatedTasks.map((task) => [
                  task.description,
                  task.status,
                  task.priority,
                  task.dateline,
                  <Actions key={task.id} onDelete={() => setTasks(tasks.filter((item) => item.id !== task.id))} onEdit={() => setTaskForm(task)} />,
                ])}
              />
              <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            </Panel>
          </section>
        )}

        {activeTab === "settings" && (
          <Panel title="Configuracion simulada" description="Formulario para preferencias del dashboard.">
            <form
              className="grid max-w-2xl gap-3"
              onSubmit={(event) => {
                event.preventDefault();
                showAlert({ type: "success", message: "Configuracion guardada correctamente." });
              }}
            >
              <Input label="Nombre de empresa" onChange={(value) => setSettings({ ...settings, company: value })} value={settings.company} />
              <SelectInput label="Notificaciones" onChange={(value) => setSettings({ ...settings, notifications: value })} options={["Si", "No"]} value={settings.notifications} />
              <SelectInput label="Tema de color" onChange={(value) => setSettings({ ...settings, color: value })} options={["Verde", "Azul", "Oscuro"]} value={settings.color} />
              <Button>Guardar configuracion</Button>
            </form>
          </Panel>
        )}
      </div>
    </main>
  );
}

function Panel({ children, description, title }: { children: React.ReactNode; description: string; title: string }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mb-5 mt-1 text-sm text-slate-500">{description}</p>
      {children}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-emerald-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-4xl font-black text-emerald-800">{value}</p>
    </div>
  );
}

function Alert({ children, type }: { children: React.ReactNode; type: "success" | "error" }) {
  return (
    <div className={`mb-5 rounded-lg border p-4 text-sm font-semibold ${type === "success" ? "border-emerald-300 bg-emerald-50 text-emerald-900" : "border-red-300 bg-red-50 text-red-900"}`}>
      {children}
    </div>
  );
}

function Spinner({ show }: { show: boolean }) {
  if (!show) return <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">Listo</span>;
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-800" />
      Simulando backend...
    </span>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">{children}</span>;
}

function Button({
  children,
  onClick,
  type = "submit",
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "submit" | "button";
  variant?: "primary" | "secondary" | "danger";
}) {
  const styles = {
    primary: "bg-emerald-700 text-white hover:bg-emerald-800",
    secondary: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };
  return <button className={`rounded-md px-4 py-2 text-sm font-semibold transition ${styles[variant]}`} onClick={onClick} type={type}>{children}</button>;
}

function Input({
  label,
  onChange,
  placeholder,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  return (
    <label className="grid gap-1 text-sm font-semibold">
      {label}
      <input className="h-10 rounded-md border border-slate-300 px-3 outline-none focus:border-emerald-700" onChange={(event) => onChange(event.target.value)} placeholder={placeholder} value={value} />
    </label>
  );
}

function SelectInput({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: string[];
  value: string;
}) {
  return (
    <label className="grid gap-1 text-sm font-semibold">
      {label}
      <select className="h-10 rounded-md border border-slate-300 px-3 outline-none focus:border-emerald-700" onChange={(event) => onChange(event.target.value)} value={value}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

function Calendar({ label, onChange, value }: { label: string; onChange: (value: string) => void; value: string }) {
  return (
    <label className="grid gap-1 text-sm font-semibold">
      {label}
      <input className="h-10 rounded-md border border-slate-300 px-3 outline-none focus:border-emerald-700" onChange={(event) => onChange(event.target.value)} type="date" value={value} />
      <span className="text-xs font-normal text-slate-500">Componente Calendar simulado para seleccionar fechas.</span>
    </label>
  );
}

function DataTable({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead className="bg-slate-50">
          <tr>{headers.map((header) => <th className="border-b p-3 font-bold text-slate-500" key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr className="border-b last:border-0" key={index}>
              {row.map((cell, cellIndex) => <td className="p-3" key={cellIndex}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Actions({ onDelete, onEdit }: { onDelete: () => void; onEdit: () => void }) {
  return (
    <div className="flex gap-2">
      <Button onClick={onEdit} type="button" variant="secondary">Editar</Button>
      <Button onClick={onDelete} type="button" variant="danger">Eliminar</Button>
    </div>
  );
}

function Pagination({ page, setPage, totalPages }: { page: number; setPage: (page: number) => void; totalPages: number }) {
  return (
    <div className="mt-4 flex items-center justify-between">
      <Button onClick={() => setPage(Math.max(1, page - 1))} type="button" variant="secondary">Anterior</Button>
      <span className="text-sm font-semibold">Pagina {page} de {totalPages}</span>
      <Button onClick={() => setPage(Math.min(totalPages, page + 1))} type="button" variant="secondary">Siguiente</Button>
    </div>
  );
}
