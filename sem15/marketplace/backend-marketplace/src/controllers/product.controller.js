const Product =
require(
"../models/Product"
);

exports.getProducts =
async(
req,
res
)=>{

const products =
await Product.findAll();

res.json(
products
);

};

exports.getProduct =
async(
req,
res
)=>{

const product =
await Product.findByPk(
req.params.id
);

res.json(
product
);

};

exports.createProduct =
async(
req,
res
)=>{

const product =
await Product.create(
req.body
);

res.json(
product
);

};