const express = require('express')
const router = express.Router()
const controller = require('../../controller/admin/products.controller')
router.get("/",controller.getProducts);
router.patch("/change-status/:status/:id",controller.putProducts)
router.patch("/change-status-all",controller.putAllProducts)
module.exports = router;