const express = require('express')
var path = require('path');
// ----
// nhúng file index của router client
const route = require("./routers/client/index.router")
//---
// nhúng file index của router admin
const adminRoute = require("./routers/admin/index.router")
// ------
// các config của hệ thống như biến prefixAdmin
const systemConfix = require("./config/system");
// --------
// gói để override các method khi gửi form , bởi vì trong html thuần chỉ có thể dùng 2 phương thức là GET và POST
const methodOverride = require('method-override');
// --------
// body-parser để phân tích dữ liệu từ body của request trước khi xử lý (lấy thông tin từ các trường input của Form bằng câu lệnh req.body.<tên của ô input trong form>)
const bodyParser = require("body-parser")
const app = express()
// flash
var flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
app.use(cookieParser('CT070325'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// ---------
// require dotenv de dung bien moi truong
require('dotenv').config();
const port = process.env.port;
//----------
// khai bao de dung body-parser
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(methodOverride('_method'))
// ---------
// cau hinh de mọi file/tệp trong thư mục public và các thư mục con bên trong nó đều được phục vụ trực tiếp ra ngoài.
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.set('view engine', "pug");
app.set("views", `${__dirname}/views`);
//------------
// su dung tinymce de cho phep admin edit text ngay tren trang web
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// app local variables
app.locals.prefixAdmin = systemConfix.prefixAdmin;
// Router
route(app);
adminRoute(app);
app.listen(port, () => {
    console.log(`exemple app is listening on port ${port}`);
})