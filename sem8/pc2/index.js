//En programación, el orden de las líneas importa mucho.
//Es mejor registrar todas las rutas antes de que el servidor se ponga a "escuchar".
const express = require('express');
const sequelize = require('./config/database');

// 1. Importar Modelos (para que Sequelize cree las tablas) [cite: 65]
const Medicamento = require('./models/Medicamento');
const Usuario = require('./models/Usuario');
// Importar modelos de venta 
const OrdenVenta = require('./models/OrdenVenta');
const DetalleOrdenVta = require('./models/DetalleOrdenVta');
const Laboratorio = require('./models/Laboratorio');
const OrdenCompra = require('./models/OrdenCompra');
const DetalleOrdenCompra = require('./models/DetalleOrdenCompra');
const compraController = require('./controllers/compraController');
// 2. Importar Rutas [cite: 67]
const authController = require('./controllers/authController');
const medicamentoRoutes = require('./routes/medicamentoRoutes');
// Ruta de ventas
const ventaController = require('./controllers/ventaController');
const { verificarToken, permitirRoles } = require('./middleware/auth');
const app = express();

// 3. Middlewares Globales
app.use(express.json()); // Para que el servidor entienda JSON [cite: 62]

// 4. Definición de Rutas 
// Rutas de autenticación
app.post('/api/auth/registrar', authController.registrar);
app.post('/api/auth/login', authController.login);

// Rutas de medicamentos (estas ya traen su seguridad interna) [cite: 53]
app.use('/api/medicamentos', medicamentoRoutes);
// Ruta para registrar ventas, protegida para ADMIN y VENDEDOR [cite: 44, 45, 72]
app.post('/api/ventas', verificarToken, permitirRoles('ADMIN', 'VENDEDOR'), ventaController.registrarVenta);
app.post('/api/compras', verificarToken, permitirRoles('ADMIN', 'ALMACEN'), compraController.registrarCompra);

const PORT = 3000;

// 5. Sincronizar Base de Datos y Arrancar Servidor [cite: 60, 61]
sequelize.sync({ force: false }) 
  .then(() => {
    console.log('Conexión a MySQL exitosa y tablas sincronizadas');
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  })
  .catch(err => console.log('Error al conectar a la BD:', err));


// Definir relaciones (esto crea las llaves foráneas del diagrama)
// Relación Venta - Detalle
OrdenVenta.hasMany(DetalleOrdenVta, { foreignKey: 'NroOrdenVta' });
DetalleOrdenVta.belongsTo(OrdenVenta, { foreignKey: 'NroOrdenVta' });

// Relación Medicamento - Detalle
Medicamento.hasMany(DetalleOrdenVta, { foreignKey: 'CodMedicamento' });
DetalleOrdenVta.belongsTo(Medicamento, { foreignKey: 'CodMedicamento' });
// Relación Compra - Detalle
OrdenCompra.hasMany(DetalleOrdenCompra, { foreignKey: 'NroOrdenC' });
DetalleOrdenCompra.belongsTo(OrdenCompra, { foreignKey: 'NroOrdenC' });

// Relación Medicamento - Detalle Compra
Medicamento.hasMany(DetalleOrdenCompra, { foreignKey: 'CodMedicamento' });
DetalleOrdenCompra.belongsTo(Medicamento, { foreignKey: 'CodMedicamento' });