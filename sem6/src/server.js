import express from "express";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";

dotenv.config();


const app = express();


// conectar a MongoDB
conectarDB();


// middlewares
app.use(express.json());


// rutas
app.use("/api/usuarios", usuarioRoutes);

app.use("/api/productos", productoRoutes);
// puerto
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
