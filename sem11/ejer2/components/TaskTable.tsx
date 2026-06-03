import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tasks = [
  { id: 1, title: "Implementar autenticacion", project: "E-commerce Platform", status: "En progreso", priority: "Alta", assignee: "Maria Garcia", dueDate: "2026-06-15" },
  { id: 2, title: "Disenar pantalla de perfil", project: "Mobile App", status: "Pendiente", priority: "Media", assignee: "Ana Lopez", dueDate: "2026-06-20" },
  { id: 3, title: "Configurar CI/CD", project: "API Gateway", status: "Completado", priority: "Alta", assignee: "Carlos Ruiz", dueDate: "2026-06-10" },
  { id: 4, title: "Optimizar queries SQL", project: "E-commerce Platform", status: "En progreso", priority: "Urgente", assignee: "Juan Perez", dueDate: "2026-06-12" },
  { id: 5, title: "Documentar API endpoints", project: "API Gateway", status: "Pendiente", priority: "Baja", assignee: "Laura Martinez", dueDate: "2026-06-25" },
];

const statusVariant = (status: string) => {
  if (status === "Completado") return "default";
  if (status === "En progreso") return "secondary";
  return "outline";
};

const priorityVariant = (priority: string) => {
  if (priority === "Urgente") return "destructive";
  if (priority === "Alta") return "default";
  if (priority === "Media") return "secondary";
  return "outline";
};

export function TaskTable() {
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table className="min-w-[780px]">
        <TableCaption>Lista de todas las tareas del proyecto</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"><Checkbox /></TableHead>
            <TableHead>Tarea</TableHead>
            <TableHead>Proyecto</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Prioridad</TableHead>
            <TableHead>Asignado a</TableHead>
            <TableHead>Fecha limite</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell><Checkbox /></TableCell>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.project}</TableCell>
              <TableCell><Badge variant={statusVariant(task.status)}>{task.status}</Badge></TableCell>
              <TableCell><Badge variant={priorityVariant(task.priority)}>{task.priority}</Badge></TableCell>
              <TableCell>{task.assignee}</TableCell>
              <TableCell>{task.dueDate}</TableCell>
              <TableCell className="text-right"><Button size="sm" variant="ghost">Editar</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
