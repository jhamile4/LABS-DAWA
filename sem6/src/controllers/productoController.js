import Producto from "../models/Producto.js";

// CREAR
export const crearProducto = async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json({ ok: true, data: producto });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: error.message });
  }
};

// LISTAR con filtros
export const obtenerProductos = async (req, res) => {
  try {
    const { page = 1, limit = 5, categoria, nombre, sort } = req.query;

    let filtro = {};

    if (categoria) filtro.categoria = categoria;
    if (nombre) filtro.nombre = { $regex: nombre, $options: "i" };

    let query = Producto.find(filtro);

    if (sort === "precio") {
      query = query.sort({ precio: 1 });
    }

    const productos = await query
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ ok: true, data: productos });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: "Error del servidor" });
  }
};

// OBTENER POR ID
export const obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);

    if (!producto) {
      return res.status(404).json({ ok: false, mensaje: "No encontrado" });
    }

    res.json({ ok: true, data: producto });
  } catch {
    res.status(400).json({ ok: false, mensaje: "ID inválido" });
  }
};

// ACTUALIZAR
export const actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!producto) {
      return res.status(404).json({ ok: false, mensaje: "No encontrado" });
    }

    res.json({ ok: true, data: producto });
  } catch (error) {
    res.status(400).json({ ok: false, mensaje: error.message });
  }
};

// ELIMINAR
export const eliminarProducto = async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);

    if (!producto) {
      return res.status(404).json({ ok: false, mensaje: "No encontrado" });
    }

    res.json({ ok: true, mensaje: "Eliminado" });
  } catch {
    res.status(400).json({ ok: false, mensaje: "ID inválido" });
  }
};

