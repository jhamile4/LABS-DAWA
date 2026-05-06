const OrdenCompra = require('../models/OrdenCompra');
const Medicamento = require('../models/Medicamento');

exports.registrarCompra = async (req, res) => {
  const { CodMedicamento, cantidad, CodLab, precioCompra } = req.body;

  try {
    const med = await Medicamento.findByPk(CodMedicamento);
    if (!med) return res.status(404).json({ mensaje: "Medicamento no encontrado" });

    // 1. Crear la orden de compra
    await OrdenCompra.create({
      total: precioCompra * cantidad,
      CodLab: CodLab
    });

    // 2. Aumentar stock automáticamente (Requerimiento 40)
    med.stock += parseInt(cantidad);
    await med.save();

    res.json({ 
      mensaje: "Compra registrada. Stock actualizado correctamente", 
      nuevoStock: med.stock 
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al procesar compra", error });
  }
};