const productRouter = require("./product.router");
const homeRouter = require("./home.router");
const contactRouter = require("./contact.route");
const categoryMiddleware = require("../../middleware/client/category.middleware")
module.exports = (app) => {
    app.use(categoryMiddleware.category)
    app.use('/',homeRouter)
    app.use("/products", productRouter);
    app.use("/contact",contactRouter)
}