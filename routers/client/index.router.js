const productRouter = require("./product.router");
const homeRouter = require("./home.router");
module.exports = (app) => {
    app.get('/', homeRouter)
    app.use("/products", productRouter);
    
}