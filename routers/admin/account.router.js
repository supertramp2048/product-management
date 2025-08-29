const express = require("express")
const { storage } = require('../../storage/storage');
// khai bao multer de upload anh
const multer = require('multer')
const upload = multer({ storage })
const validate = require("../../validate/admin/validate.account")
// ----------
const router = express.Router()
const controller = require("../../controller/admin/account.controller")
router.get("/",controller.accountPage)
router.get("/newAccount",controller.newAccount)
// router.post("/newAccountPost",upload.single('avatar'),validate.account,controller.newAccountPost)
router.post("/newAccountPost",upload.single('avatar'),controller.newAccountPost)
router.delete("/delete/:id",controller.deleteAccount)
router.get("/:id/editAccount",controller.editAccount)
module.exports = router