const express = require('express')
const route = express.Router()
const {storage} = require('../../storage/storage')
const multer = require('multer')
const upload = multer({storage})
const controller = require("../../controller/client/chat.controller")
route.get('/',controller.chat)
route.post('/uploadImgs',upload.array('images',6), controller.chatUploadImgs )
module.exports = route