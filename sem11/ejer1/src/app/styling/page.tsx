"use client";

import { FormEvent, useState } from "react";
import Card from "@/components/cards/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function StylingPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (value: string) => {
    setEmail(value);
    if (!value.includes("@") && value.length > 0) {
      setEmailError("Ingrese un correo valido con @");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !email.includes("@")) {
      setEmailError("El correo es obligatorio y debe incluir @");
      return;
    }
    setLoading(true);
    window.setTimeout(() => setLoading(false), 1200);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-rose-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">
            CSS Modules + Tailwind CSS
          </p>
          <h1 className="mt-3 text-4xl font-black text-gray-950">
            Sistema de componentes reutilizables
          </h1>
          <p className="mt-3 max-w-3xl text-gray-600">
            CSS Modules se usa para efectos complejos como onda, spinner y
            labels flotantes. Tailwind se usa para layout, spacing, colores y
            responsive.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          <Card
            footer={<Button fullWidth>Inscribirme</Button>}
            image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80"
            subtitle="Frontend"
            title="React moderno"
          >
            <div className="space-y-4">
              <p>Card creada con Tailwind CSS para estructura responsive.</p>
              <Badge rounded variant="success">
                Disponible
              </Badge>
            </div>
          </Card>

          <Card
            footer={<Button fullWidth variant="secondary">Ver temario</Button>}
            image="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80"
            subtitle="Backend"
            title="Node.js API"
          >
            <div className="space-y-4">
              <p>Botones con gradientes, sombras y efecto de onda con CSS Modules.</p>
              <Badge rounded variant="warning">
                En progreso
              </Badge>
            </div>
          </Card>

          <Card
            footer={<Button disabled fullWidth variant="outline">Cerrado</Button>}
            image="https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80"
            subtitle="Datos"
            title="Python para datos"
          >
            <div className="space-y-4">
              <p>Estados disabled, loading y tamanos diferentes en el componente Button.</p>
              <Badge rounded variant="neutral">
                Finalizado
              </Badge>
            </div>
          </Card>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Card title="Variantes de botones">
            <div className="flex flex-wrap gap-4">
              <Button size="sm">Primario</Button>
              <Button variant="secondary">Secundario</Button>
              <Button size="lg" variant="outline">
                Outline
              </Button>
              <Button loading={loading} onClick={() => setLoading(true)}>
                Loading
              </Button>
            </div>
          </Card>

          <Card title="Formulario con validacion">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <Input
                error={emailError}
                label="Correo electronico"
                onChange={validateEmail}
                type="email"
                value={email}
              />
              <Button fullWidth loading={loading} type="submit">
                Enviar formulario
              </Button>
              <div className="rounded-lg bg-indigo-50 p-4 text-sm text-indigo-900">
                <strong>Resultado:</strong> CSS Modules resuelve animaciones y
                pseudo-elementos; Tailwind resuelve layout, responsive y estilos
                rapidos.
              </div>
            </form>
          </Card>
        </section>
      </div>
    </main>
  );
}
