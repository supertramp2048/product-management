const productRouter = require("./product.router");
const homeRouter = require("./home.router");
const contactRouter = require("./contact.route");
module.exports = (app) => {
    app.use('/', homeRouter)
    app.use("/products", productRouter);
    app.use("/contact",contactRouter)
}