import { pool } from '../config/database.js';

// LISTAR
export const getEmpleados = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM empleados');
    res.json(rows);
};

// POR ID
export const getEmpleado = async (req, res) => {
    const [rows] = await pool.query(
        'SELECT * FROM empleados WHERE id = ?',
        [req.params.id]
    );

    if (rows.length === 0) {
        return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }

    res.json(rows[0]);
};

// CREAR
export const createEmpleado = async (req, res) => {
    const { nombre, puesto, salario } = req.body;

    const [result] = await pool.query(
        'INSERT INTO empleados(nombre, puesto, salario) VALUES (?, ?, ?)',
        [nombre, puesto, salario]
    );

    res.status(201).json({
        id: result.insertId,
        nombre,
        puesto,
        salario
    });
};

// ACTUALIZAR
export const updateEmpleado = async (req, res) => {
    const { nombre, puesto, salario } = req.body;

    const [result] = await pool.query(
        'UPDATE empleados SET nombre=?, puesto=?, salario=? WHERE id=?',
        [nombre, puesto, salario, req.params.id]
    );

    if (result.affectedRows === 0) {
        return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }

    res.json({ mensaje: 'Empleado actualizado' });
};

// ELIMINAR
export const deleteEmpleado = async (req, res) => {
    const [result] = await pool.query(
        'DELETE FROM empleados WHERE id=?',
        [req.params.id]
    );

    if (result.affectedRows === 0) {
        return res.status(404).json({ mensaje: 'Empleado no encontrado' });
    }

    res.json({ mensaje: 'Empleado eliminado' });
};