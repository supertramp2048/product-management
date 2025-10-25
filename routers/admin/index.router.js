const systemConfig = require("../../config/system");
const dashboardRouter = require("./dashboard.router");
const productsRouter = require("./products.router");
const productsCategoryRouter = require("./productCategory.router");
const roleRouter = require("./role.router");
const permissionRouter = require("./permission.router")
const account = require("./account.router")
const authen = require("./authen.router")
const generalSetting = require("./generalSetting.route")
const authentic = require("../../middleware/admin/auth.middleware")
const generalSettingMiddleware = require("../../middleware/admin/generalsetting.middleware")
require('dotenv').config()
const tiniMCEUrl =process.env.URL_TINIMCE
// khai bao storage cloundinary
const { storage } = require('../../storage/storage');
// khai bao multer de upload anh
const multer = require('multer')
const upload = multer({ storage })
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin
    // Đặt riêng cho TinyMCE
    app.post('/admin/productsCategory/tiniMCE-img', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    res.json({ location: req.file.path }); // CloudinaryStorage tự gắn url vào .path
    });
    app.use(PATH_ADMIN+'/dashboard',authentic.authRequire, dashboardRouter);
    app.use(PATH_ADMIN+'/products',authentic.authRequire,productsRouter);
    app.use(PATH_ADMIN+'/productsCategory',authentic.authRequire,productsCategoryRouter);
    app.use(PATH_ADMIN+'/role',authentic.authRequire,roleRouter)
    app.use(PATH_ADMIN+'/permission',authentic.authRequire,permissionRouter)
    app.use(PATH_ADMIN+'/account',authentic.authRequire,account)
    app.use(PATH_ADMIN+'/generalSetting',authentic.authRequire,generalSettingMiddleware.generalsetting,generalSetting)
    app.use(PATH_ADMIN+'/auth',authen)
}