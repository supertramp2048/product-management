const express = require("express")
const router = express.Router()
const controller = require("../../controller/admin/permission.controller")
router.get("/",controller.permission)
router.patch("/changePermission",controller.changePermission)
module.exports = router