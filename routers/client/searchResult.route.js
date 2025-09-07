const express = require("express")
const route = express.Router()
const controller = require("../../controller/client/searchResult.controller")
route.get("/",controller.search)
module.exports = route