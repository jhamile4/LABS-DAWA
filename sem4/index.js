const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = 3000;

// MOTOR DE VISTAS (EJS)
app.set('view engine', 'ejs');
//app.use(expressLayouts);
app.set('layout', 'layout');

// ARCHIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname, 'public')));

// RUTAS
const rutas = require('./routes/rutas');
app.use('/', rutas);

// 404
app.use((req, res) => {
  res.status(404).render('index', { titulo: 'Error' });
});

// SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});