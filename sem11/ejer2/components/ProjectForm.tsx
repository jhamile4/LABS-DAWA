"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

export type NewProject = {
  name: string;
  description: string;
  category: string;
  priority: string;
};

type ProjectFormProps = {
  onAddProject: (project: NewProject) => void;
};

export function ProjectForm({ onAddProject }: ProjectFormProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    priority: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddProject(formData);
    setFormData({ name: "", description: "", category: "", priority: "" });
    setOpen(false);
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger>
        <Button onClick={() => setOpen(true)} type="button">
          + Nuevo Proyecto
        </Button>
      </DialogTrigger>
      {open && (
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
              <DialogDescription>
                Completa la informacion del proyecto y guarda los cambios.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre del Proyecto</Label>
                <Input
                  id="name"
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  placeholder="Mi Proyecto Web"
                  required
                  value={formData.name}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descripcion</Label>
                <Input
                  id="description"
                  onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                  placeholder="Breve descripcion del proyecto"
                  value={formData.description}
                />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Categoria</Label>
                  <Select
                    onChange={(event) => setFormData({ ...formData, category: event.target.value })}
                    required
                    value={formData.category}
                  >
                    <option value="">Selecciona</option>
                    <option value="web">Desarrollo Web</option>
                    <option value="mobile">Mobile</option>
                    <option value="design">Diseno</option>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Prioridad</Label>
                  <Select
                    onChange={(event) => setFormData({ ...formData, priority: event.target.value })}
                    required
                    value={formData.priority}
                  >
                    <option value="">Selecciona</option>
                    <option value="low">Baja</option>
                    <option value="medium">Media</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogCloseButton onClick={() => setOpen(false)} />
              <Button type="submit">Crear Proyecto</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}
