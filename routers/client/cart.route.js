const express = require("express")
const router = express.Router()
const controller = require("../../controller/client/cart.controller")
router.get("/",controller.cart)
router.post("/add/:productId",controller.addToCartPost)
router.patch("/update/:action/:productId",controller.updateCart)
module.exports = router