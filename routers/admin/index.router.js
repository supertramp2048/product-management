const systemConfig = require("../../config/system");
const dashboardRouter = require("./dashboard.router");
const productsRouter = require("./products.router");
const productsCategoryRouter = require("./productCategory.router");
const roleRouter = require("./role.router");
const permissionRouter = require("./permission.router")
const account = require("./account.router")
const authen = require("./authen.router")
const authentic = require("../../middleware/admin/auth.middleware")
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin
    app.use(PATH_ADMIN+'/dashboard',authentic.authRequire, dashboardRouter);
    app.use(PATH_ADMIN+'/products',authentic.authRequire,productsRouter);
    app.use(PATH_ADMIN+'/productsCategory',authentic.authRequire,productsCategoryRouter);
    app.use(PATH_ADMIN+'/role',authentic.authRequire,roleRouter)
    app.use(PATH_ADMIN+'/permission',authentic.authRequire,permissionRouter)
    app.use(PATH_ADMIN+'/account',authentic.authRequire,account)
    app.use(PATH_ADMIN+'/auth',authen)
}