const express = require('express')
// khai bao storage cloundinary
const { storage } = require('../../storage/storage');
// khai bao multer de upload anh
const multer = require('multer')
const upload = multer({ storage })
// -----
// khai bao bien router
const router = express.Router()
const controller = require('../../controller/admin/products.controller')
const validate = require('../../validate/admin/validate.product')
router.get("/", controller.getProducts);
router.patch("/change-status/:status/:id", controller.putProducts)
router.patch("/change-status-all", controller.putAllProducts)
router.patch("/fix-product", controller.fixProduct)
router.delete("/delete-product", controller.deleteProduct)
router.delete("/delete-all-products", controller.deleteAllProducts)
router.get("/newProduct", controller.newProduct)
router.post("/createNewProduct",
  upload.single('thumbnail'),
  validate.createPost,
  controller.createNewProduct)
router.get("/fixProduct/:id",controller.fixProduct)
router.patch("/fixProductProcess/:id",upload.single('thumbnail'),controller.fixProductProcess)
router.get("/productDetail/:id",controller.productDetail)
module.exports = router;