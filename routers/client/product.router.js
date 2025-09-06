const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/products.controller");
router.get("/",controller.products);
router.get("/productDetail/:slug/:id", controller.productDetail)
router.get("/:slug/:id",controller.category)
module.exports = router