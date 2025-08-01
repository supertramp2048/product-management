const express = require('express')
const router = express.Router()
const controller = require('../../controller/admin/products.controller')
router.get("/",controller.getProducts);
router.put("/:id",controller.putProducts)
module.exports = router;