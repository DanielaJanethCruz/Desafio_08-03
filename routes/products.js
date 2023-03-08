var express = require("express");
var router = express.Router();
let productModel = require("../models/productModel");

/* Listado de Productos. GET */
router.get("/", async function (req, res, next) {
  const resultado = await productModel.find();
  res.json(resultado);
});

/* Listado de Productos. POST*/
router.post("/", async function (req, res, next) {
  let producto = new productModel({
    //objeto del esquema definido
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
  });
  let result = await producto.save();
  res.json("Registro Agregado Exitosamente");
});

/* Listado de Productos. PUT*/
router.put("/:id", async function (req, res, next) {
  const filter = { id: req.query.id };
  const update = { name: req.query.name };

  const resultado = await productModel.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true,
  });
  res.json("Se actualizo el Producto: " + req.params.id);
});

/* Listado de Productos. DELETE*/
router.delete("/:id", async function (req, res, next) {
  const resul = await productModel.find({ id: req.params.id }).exec();
  if (resul.length > 0) {
    await productModel.deleteOne({ id: req.params.id });
    res.json("Eliminando producto");
  } else {
    res.json({ error: "No se encontró el producto con Id " + req.params.id });
  }
});
module.exports = router;
