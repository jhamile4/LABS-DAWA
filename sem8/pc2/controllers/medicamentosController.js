const Medicamento = require('../models/Medicamento');

// Registrar nuevo medicamento
exports.crear = async (req, res) => {
  try {
    const nuevo = await Medicamento.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear", error });
  }
};

// Listar todos los medicamentos
exports.listar = async (req, res) => {
  const lista = await Medicamento.findAll();
  res.json(lista);
};

// Actualizar medicamento (precio, stock, etc.)
exports.actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const [actualizado] = await Medicamento.update(req.body, { 
      where: { CodMedicamento: id } 
    });

    if (actualizado) {
      const medActualizado = await Medicamento.findByPk(id);
      return res.json({ mensaje: "Medicamento actualizado", data: medActualizado });
    }
    
    res.status(404).json({ mensaje: "Medicamento no encontrado" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar", error });
  }
};

// Eliminar (Solo para ADMIN según requerimiento)
exports.eliminar = async (req, res) => {
  await Medicamento.destroy({ where: { CodMedicamento: req.params.id } });
  res.json({ mensaje: "Medicamento eliminado" });
};