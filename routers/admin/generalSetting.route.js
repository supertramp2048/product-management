const express = require('express')
const route = express.Router()
const { storage } = require('../../storage/storage');
// khai bao multer de upload anh
const multer = require('multer')
const upload = multer({ storage })
const controller = require("../../controller/admin/generalSetting.controller")
route.get("/",controller.generalSetting)
route.get("/FooterSetting",controller.foterSetting)
route.patch("/FooterSetting",upload.single("companyLogo"),controller.foterSettingUpdate)
route.get("/logoSetting",controller.logoSetting)
route.get("/paymentSetting",controller.paymentSetting)
route.get("/advertismentSetting",controller.advertismentSetting)
module.exports = route