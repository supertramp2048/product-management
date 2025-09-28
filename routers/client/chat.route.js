const express = require('express')
const route = express.Router()
const controller = require("../../controller/client/chat.controller")
route.get('/',controller.chat)
module.exports = route