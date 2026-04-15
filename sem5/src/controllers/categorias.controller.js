import { pool } from '../config/database.js';

// LISTAR
export const getCategorias = async (req,res)=>{
  const [rows] = await pool.query('CALL listar_categoria()');
  res.json(rows[0]);
};

// CREAR
export const createCategoria = async (req,res)=>{
  const {nombre} = req.body;
  await pool.query('CALL insertar_categoria(?)',[nombre]);
  res.json({msg:"Categoria creada"});
};

// ACTUALIZAR
export const updateCategoria = async (req,res)=>{
  const {nombre} = req.body;
  await pool.query('CALL actualizar_categoria(?,?)',[req.params.id,nombre]);
  res.json({msg:"Categoria actualizada"});
};

// ELIMINAR
export const deleteCategoria = async (req,res)=>{
  await pool.query('CALL eliminar_categoria(?)',[req.params.id]);
  res.json({msg:"Categoria eliminada"});
};