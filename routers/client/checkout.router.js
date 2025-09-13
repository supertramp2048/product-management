const express = require("express")
const route = express.Router()
const controller = require("../../controller/client/checkout.controller")
route.get("/",controller.checkout)
route.post("/order",controller.order)
route.get("/success/:order_id",controller.success)
module.exports = route