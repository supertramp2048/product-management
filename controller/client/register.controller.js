const userAccount = require("../../models/userAccount.model")
const Cart = require("../../models/cart.model")
var md5 = require('md5');
module.exports.register = async (req,res) => {
    res.render("client/pages/register/index.pug")
}
module.exports.signUp = async (req,res) => {
    try {
    const email = req.body.email
    const isEmailExited = await userAccount.findOne({email: email})
    const phone = req.body.phone 
    const isPhoneExited = await userAccount.findOne({phone: phone})
    if(isEmailExited){
        req.flash("error","Email đã được đăng ký")
        res.redirect("/register")
        return
    }
    else if (isPhoneExited){
        req.flash("error","Số điện thoại đã được đăng ký")
        res.redirect("/register")
        return
    }
    else {
       try {
        if(req.file){
        console.log("file: ",req.file);
        req.body.avatar = req.file.path
        }
        
        const newPassword = md5(req.body.password)
        req.body.password = newPassword
        const objUser = req.body
        const newUser = new userAccount(objUser)
        await newUser.save()
        res.locals.user = newUser
        res.cookie("userToken",newUser.userToken)
        let cart = new Cart()
        cart.user_id =  newUser._id
        await cart.save()
        res.cookie("cartId",cart._id)
       } catch (error) {
        
       }
    }
    } catch (error) {
        console.log(error);
        
    }
    res.redirect("/")
}
module.exports.signIn = async (req,res) => {
    res.render("client/pages/register/signIn.pug")
}
module.exports.signInPost = async (req,res) => {
    const hashedPassword = md5(req.body.password)
    req.body.password = hashedPassword
    const objUser = req.body
    const isUserExited = await userAccount.findOne(objUser).select("-password")
    if(isUserExited){
        res.locals.user = isUserExited
        res.cookie("userToken",isUserExited.userToken)
        let cart = await Cart.findOne({user_id: isUserExited._id})
        if(cart){
           res.cookie("cartId", cart._id)
        }
        res.redirect("/")
    }
    else {
        req.flash("error","Tai khoan khoac mat khau khong dung")
        res.redirect("/register/signIn")
    }
}
module.exports.logOut = async (req,res) => {
    res.clearCookie('userToken');
    res.clearCookie("cartId")
    res.redirect("/")
}
