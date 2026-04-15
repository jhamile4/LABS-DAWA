import { pool } from '../config/database.js';

// LISTAR
export const getProductos = async (req,res)=>{
  const [rows] = await pool.query('CALL listar_productos()');
  res.json(rows[0]);
};

// POR ID
export const getProducto = async (req,res)=>{
  const [rows] = await pool.query('SELECT * FROM productos WHERE id=?',[req.params.id]);
  if(rows.length==0) return res.status(404).json({msg:"Producto no encontrado"});
  res.json(rows[0]);
};

// CREAR
export const createProducto = async (req,res)=>{
  const {nombre,precio,stock,categoria_id} = req.body;

  if(!nombre) return res.status(400).json({msg:"Nombre obligatorio"});
  if(precio<=0) return res.status(400).json({msg:"Precio inválido"});
  if(stock<0) return res.status(400).json({msg:"Stock inválido"});

  await pool.query('CALL insertar_producto(?,?,?,?)',
  [nombre,precio,stock,categoria_id]);

  res.json({msg:"Producto creado"});
};

// ACTUALIZAR
export const updateProducto = async (req,res)=>{
  const {nombre,precio,stock} = req.body;
  await pool.query('CALL actualizar_producto(?,?,?,?)',
  [req.params.id,nombre,precio,stock]);
  res.json({msg:"Producto actualizado"});
};

// ELIMINAR
export const deleteProducto = async (req,res)=>{
  await pool.query('CALL eliminar_producto(?)',[req.params.id]);
  res.json({msg:"Producto eliminado"});
};