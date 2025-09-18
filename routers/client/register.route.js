const express= require("express")
const route = express.Router()
const validate = require("../../validate/client/validate.userAccount")
const controller = require("../../controller/client/register.controller")
const {storage}  = require('../../storage/storage');
const multer  = require('multer')
const upload = multer({storage})
route.get("/",controller.register)
route.post("/signUp",upload.single('avatar'),validate.signUpValidate,controller.signUp)
route.get("/signIn",controller.signIn)
route.post("/signIn",controller.signInPost)
route.get("/logOut",controller.logOut)
module.exports = route