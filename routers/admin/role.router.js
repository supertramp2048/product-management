const express = require('express')
const router = express.Router()
const controller = require('../../controller/admin/role.controller')
router.get("/",controller.role)
router.get("/newRole",controller.newRole)
router.post("/newRolePost",controller.newRolePost)
module.exports = router