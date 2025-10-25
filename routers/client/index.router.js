const productRouter = require("./product.router");
const homeRouter = require("./home.router");
const contactRouter = require("./contact.route");
const categoryMiddleware = require("../../middleware/client/category.middleware")
const cartMiddleware = require("../../middleware/client/cartId.middleware")
const authMiddleware = require("../../middleware/client/authMiddleware")
const searchResult = require("./searchResult.route")
const cart = require("./cart.route")
const cartLengthMiddleware = require("../../middleware/client/cartLength.middleware")
const checkout = require("./checkout.router")
const register = require("./register.route")
const forgotPassword = require("./forgotPassword.route")
const generalSettingMiddleware = require("../../middleware/client/setting.middleware")
const chat = require("./chat.route")
const express = require('express')
const route = express.Router()
module.exports = (app) => {
    app.use(categoryMiddleware.category)
    app.use(cartLengthMiddleware.arrayLength)
    app.use(generalSettingMiddleware.getGeneralSetting)
    app.get('/',authMiddleware,homeRouter)
    app.use("/chat",authMiddleware,chat)
    app.use("/products",authMiddleware, productRouter);
    app.use("/contact",authMiddleware,contactRouter)
    app.use("/search",authMiddleware,searchResult)
    app.use("/cart",authMiddleware,cartMiddleware.cartId,cart)
    app.use("/checkout",authMiddleware,checkout)
    app.use("/forgot-password",forgotPassword)
    app.use("/register",register)
}