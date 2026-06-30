const express = require('express');
const router = express.Router();
const Tarea = require('../models/Tarea');

// GET - listar todas las tareas
router.get('/', async (req, res) => {
  try {
    const tareas = await Tarea.find().sort({ createdAt: -1 });
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// POST - crear una tarea
router.post('/', async (req, res) => {
  try {
    const nuevaTarea = new Tarea(req.body);
    const tareaGuardada = await nuevaTarea.save();
    res.status(201).json(tareaGuardada);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// PUT - actualizar una tarea
router.put('/:id', async (req, res) => {
  try {
    const tareaActualizada = await Tarea.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!tareaActualizada) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    res.json(tareaActualizada);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
});

// DELETE - eliminar una tarea
router.delete('/:id', async (req, res) => {
  try {
    const tareaEliminada = await Tarea.findByIdAndDelete(req.params.id);
    if (!tareaEliminada) return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    res.json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

module.exports = router;