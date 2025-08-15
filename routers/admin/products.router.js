const express = require('express')
// khai bao multer de upload anh
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})
const upload = multer({ storage: storage })
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