const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
"/api/products",
require("./routes/products")
);
app.use(
"/api/auth",
require(
"./routes/auth"
)
);
module.exports = app;