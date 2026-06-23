const Product = require("../models/Product");

exports.getAll = async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
};

exports.getById = async (req, res) => {
  const product = await Product.findByPk(req.params.id);

  if (!product) {
    return res.status(404).json({
      mensaje: "No encontrado"
    });
  }

  res.json(product);
};

exports.create = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json(product);
};

exports.update = async (req, res) => {
  await Product.update(
    req.body,
    {
      where: {
        id: req.params.id
      }
    }
  );

  res.json({
    mensaje: "Actualizado"
  });
};

exports.remove = async (req, res) => {
  await Product.destroy({
    where: {
      id: req.params.id
    }
  });

  res.json({
    mensaje: "Eliminado"
  });
};