const systemConfig = require("../../config/system");
const dashboardRouter = require("./dashboard.router");
const productsRouter = require("./products.router");
const productsCategoryRouter = require("./productCategory.router");
const roleRouter = require("./role.router");
const permissionRouter = require("./permission.router")
const account = require("./account.router")
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin
    app.use(PATH_ADMIN+'/dashboard', dashboardRouter);
    app.use(PATH_ADMIN+'/products',productsRouter);
    app.use(PATH_ADMIN+'/productsCategory',productsCategoryRouter);
    app.use(PATH_ADMIN+'/role',roleRouter)
    app.use(PATH_ADMIN+'/permission',permissionRouter)
    app.use(PATH_ADMIN+'/account',account)
}