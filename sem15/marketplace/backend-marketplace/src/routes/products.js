const router =
require("express").Router();

const auth =
require("../middleware/auth");

const {

getProducts,
getProduct,
createProduct

} =
require(
"../controllers/product.controller"
);

router.get(
"/",
getProducts
);

router.get(
"/:id",
getProduct
);

router.post(

"/",

auth(
["ADMIN"]
),

createProduct

);

module.exports =
router;