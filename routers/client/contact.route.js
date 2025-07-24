const express= require("express");
const router= express.Router();

router.get("/",(req,res) =>{
    res.render("client/pages/contact/index.pug",{
        title: "contact"
    })
})
module.exports= router
