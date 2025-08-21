const systemConfig = require("../../config/system");
const dashboardRouter = require("./dashboard.router");
const productsRouter = require("./products.router");
const productsCategoryRouter = require("./productCategory.router");
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin
    app.use(PATH_ADMIN+'/dashboard', dashboardRouter);
    app.use(PATH_ADMIN+'/products',productsRouter);
    app.use(PATH_ADMIN+'/productsCategory',productsCategoryRouter);
}