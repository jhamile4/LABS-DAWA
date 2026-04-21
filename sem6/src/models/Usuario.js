import mongoose from "mongoose";


const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  edad: { type: Number }
  
});


export default mongoose.model("Usuario", usuarioSchema);