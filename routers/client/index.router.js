const productRouter = require("./product.router");
const homeRouter = require("./home.router");
const contactRouter = require("./contact.route");
const categoryMiddleware = require("../../middleware/client/category.middleware")
const cartMiddleware = require("../../middleware/client/cartId.middleware")
const searchResult = require("./searchResult.route")
const cart = require("./cart.route")
module.exports = (app) => {
    app.use(categoryMiddleware.category)
    app.use('/',homeRouter)
    app.use("/products", productRouter);
    app.use("/contact",contactRouter)
    app.use("/search",searchResult)
    app.use("/cart",cartMiddleware.cartId,cart)
}