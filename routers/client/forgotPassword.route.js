const express = require('express')
const route = express.Router()
const controller = require("../../controller/client/forgotPassword.controller")
route.get("/",controller.forgotPassword)
route.post("/",controller.forgotPasswordPost)
route.post("/otp",controller.forgotPasswordOTPinputPost)
route.post("/resetPassword",controller.resetPasswordPost)
module.exports = route