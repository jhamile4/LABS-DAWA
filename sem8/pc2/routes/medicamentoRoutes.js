const express = require('express');
const router = express.Router();
const medicamentosController = require('../controllers/medicamentosController');
const { verificarToken, permitirRoles } = require('../middleware/auth');

// Rutas protegidas: Todos los roles pueden ver y crear, pero solo ADMIN elimina
router.use(verificarToken); // Aplica seguridad a todas estas rutas [cite: 53]

router.post('/', medicamentosController.crear);
router.get('/', medicamentosController.listar);
router.put('/:id', verificarToken, permitirRoles('ADMIN'), medicamentosController.actualizar);

// Solo el ADMIN puede eliminar medicamentos [cite: 89]
router.delete('/:id', permitirRoles('ADMIN'), medicamentosController.eliminar);

module.exports = router;