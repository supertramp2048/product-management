const express = require('express')
const route = require("./routers/client/index.router")
const app = express()
const port = 3000
app.use(express.static("public"));
app.set('view engine', "pug");
app.set("views", "./views");
// Router
route(app);
app.listen(port, () =>{
    console.log(`exemple app is listening on port ${port}`);
})