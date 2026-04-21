import Usuario from "../models/Usuario.js";


// CREAR
export const crearUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);


    return res.status(201).json({
      ok: true,
      data: usuario
    });


  } catch (error) {
    return res.status(400).json({
      ok: false,
      mensaje: error.message
    });
  }
};


// LISTAR (con paginación)
export const obtenerUsuarios = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;


    const usuarios = await Usuario.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));


    return res.json({
      ok: true,
      data: usuarios
    });


  } catch (error) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error del servidor"
    });
  }
};


// OBTENER POR ID
export const obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);


    if (!usuario) {
      return res.status(404).json({
        ok: false,
        mensaje: "Usuario no encontrado"
      });
    }


    return res.json({
      ok: true,
      data: usuario
    });


  } catch (error) {
    return res.status(400).json({
      ok: false,
      mensaje: "ID inválido"
    });
  }
};


// ACTUALIZAR
export const actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );


    if (!usuario) {
      return res.status(404).json({
        ok: false,
        mensaje: "Usuario no encontrado"
      });
    }


    return res.json({
      ok: true,
      data: usuario
    });


  } catch (error) {
    return res.status(400).json({
      ok: false,
      mensaje: error.message
    });
  }
};


// ELIMINAR
export const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);


    if (!usuario) {
      return res.status(404).json({
        ok: false,
        mensaje: "Usuario no encontrado"
      });
    }


    return res.json({
      ok: true,
      mensaje: "Usuario eliminado"
    });


  } catch (error) {
    return res.status(400).json({
      ok: false,
      mensaje: "ID inválido"
    });
  }
};
