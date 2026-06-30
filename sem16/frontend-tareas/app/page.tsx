// @ts-nocheck
"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [tareas, setTareas] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [cargando, setCargando] = useState(true);

  const cargarTareas = async () => {
    try {
      const res = await fetch(`${API_URL}/tareas`);
      const data = await res.json();
      setTareas(data);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const crearTarea = async (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    try {
      await fetch(`${API_URL}/tareas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, descripcion }),
      });
      setTitulo("");
      setDescripcion("");
      cargarTareas();
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  const toggleCompletada = async (tarea) => {
    try {
      await fetch(`${API_URL}/tareas/${tarea._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completada: !tarea.completada }),
      });
      cargarTareas();
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await fetch(`${API_URL}/tareas/${id}`, { method: "DELETE" });
      cargarTareas();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  return (
    <main style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}>
        Mis Tareas
      </h1>

      <form onSubmit={crearTarea} style={{ marginBottom: "30px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          placeholder="Título de la tarea"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }}
        />
        <input
          type="text"
          placeholder="Descripción (opcional)"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }}
        />
        <button
          type="submit"
          style={{ padding: "10px", background: "#0070f3", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          Agregar Tarea
        </button>
      </form>

      {cargando ? (
        <p>Cargando tareas...</p>
      ) : tareas.length === 0 ? (
        <p>No hay tareas todavía. ¡Agrega la primera!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
          {tareas.map((tarea) => (
            <li
              key={tarea._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: tarea.completada ? "#f0fff4" : "white",
              }}
            >
              <div>
                <p style={{ fontWeight: "bold", textDecoration: tarea.completada ? "line-through" : "none", color: "#111" }}>
                  {tarea.titulo}
                </p>
                {tarea.descripcion && <p style={{ color: "#555", fontSize: "14px" }}>{tarea.descripcion}</p>}
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => toggleCompletada(tarea)}
                  style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #ccc", cursor: "pointer", color: "#111", background: "#fff" }}
                >
                  {tarea.completada ? "Desmarcar" : "Completar"}
                </button>
                <button
                  onClick={() => eliminarTarea(tarea._id)}
                  style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #f00", color: "#f00", cursor: "pointer" }}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}