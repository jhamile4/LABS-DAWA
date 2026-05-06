const OrdenVenta = require('../models/OrdenVenta');
const DetalleOrdenVta = require('../models/DetalleOrdenVta');
const Medicamento = require('../models/Medicamento');

exports.registrarVenta = async (req, res) => {
  const { CodMedicamento, cantidad } = req.body;

  try {
    // 1. Buscar el medicamento
    const med = await Medicamento.findByPk(CodMedicamento);
    if (!med) return res.status(404).json({ mensaje: "Medicamento no encontrado" });

    // 2. Validar stock (Requerimiento 44 y 72)
    if (med.stock < cantidad) {
      return res.status(400).json({ mensaje: "Stock insuficiente para realizar la venta" });
    }

    // 3. Crear la orden y el detalle
    const nuevaVenta = await OrdenVenta.create({ total: med.precioVentaUni * cantidad });
    await DetalleOrdenVta.create({
      NroOrdenVta: nuevaVenta.NroOrdenVta,
      CodMedicamento: med.CodMedicamento,
      cantidadRequerida: cantidad
    });

    // 4. Descontar stock automáticamente (Requerimiento 45)
    med.stock -= cantidad;
    await med.save();

    res.json({ mensaje: "Venta realizada con éxito", stockRestante: med.stock });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
};