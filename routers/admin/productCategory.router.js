const express = require('express')
const router = express.Router()
// khai bao storage cloundinary
const { storage } = require('../../storage/storage');
// validate data cua form tao moi category
const validate = require('../../validate/admin/validate.product')
// khai bao multer de upload anh
const multer = require('multer')
const upload = multer({ storage })
const controller = require('../../controller/admin/productsCategory.controller')
router.get("/",controller.productsCategory)
router.get("/createNewCategoryPage",controller.createNewCategoryPage)
router.post("/createNewCategory",
  upload.single('thumbnail'),
  validate.createPost,
  controller.postNewCategory)
router.patch("/changeStatusCategory/:status/:id",controller.changeStatus)
router.get("/fixCategoryPage/:id",controller.fixCategoryPage)
router.patch("/fixCategory/:id",upload.single('thumbnail'),controller.fixCategory)
router.delete("/deleteCategory/:id",controller.deleteCategory)
module.exports = router