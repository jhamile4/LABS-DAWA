const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.registrar = async (req, res) => {
  try {
    const existe = await Usuario.findOne({ where: { email: req.body.email } });
    if (existe) return res.status(400).json({ mensaje: "El correo ya está registrado" });
    const usuario = await Usuario.create(req.body);
    res.json({ mensaje: "Usuario creado", usuario });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al registrar (Email duplicado o datos faltantes)" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ where: { email } });

  if (usuario && await bcrypt.compare(password, usuario.password)) {
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol }, 
      process.env.JWT_SECRET, 
      { expiresIn: '2h' }
    );
    res.json({ token });
  } else {
    res.status(401).json({ mensaje: "Credenciales incorrectas" });
  }
};