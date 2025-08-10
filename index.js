const express = require('express')
const route = require("./routers/client/index.router")
const adminRoute = require("./routers/admin/index.router")
const systemConfix = require("./config/system");
const methodOverride = require('method-override');
const bodyParser = require("body-parser")
const app = express()
// flash
var flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')
app.use(cookieParser('CT070325'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// end flash
require('dotenv').config();
const port = process.env.port;
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(express.static("public"));
app.use(express.json());
app.set('view engine', "pug");
app.set("views", "./views");
app.use(methodOverride('_method'))
// app local variables
app.locals.prefixAdmin = systemConfix.prefixAdmin;
// Router
route(app);
adminRoute(app);
app.listen(port, () => {
    console.log(`exemple app is listening on port ${port}`);
})