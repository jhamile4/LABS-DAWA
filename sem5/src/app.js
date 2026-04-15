import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import empleadosRoutes from './routes/empleados.routes.js';
import categoriasRoutes from './routes/categorias.routes.js';
import productosRoutes from './routes/productos.routes.js';
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//app.use('/api', empleadosRoutes);
app.use('/api',categoriasRoutes);
app.use('/api',productosRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});