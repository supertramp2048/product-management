const express = require("express")
const router = express.Router()
const controller = require("../../controller/admin/authen.controller")
router.get("/login",controller.authen)
router.post("/login",controller.loginPost)
module.exports = router