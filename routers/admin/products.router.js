const express = require('express')
const router = express.Router()
const controller = require('../../controller/admin/products.controller')
router.get("/",controller.getProducts);
router.patch("/change-status/:status/:id",controller.putProducts)
router.patch("/change-status-all",controller.putAllProducts)
router.patch("/fix-product",controller.fixProduct)
router.delete("/delete-product",controller.deleteProduct)
router.delete("/delete-all-products",controller.deleteAllProducts)
router.get("/newProduct",controller.newProduct)
router.post("/createNewProduct",controller.createNewProduct)
module.exports = router;