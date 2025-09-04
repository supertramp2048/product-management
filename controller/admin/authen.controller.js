const { prefixAdmin } = require("../../config/system")
const Account = require("../../models/account.model")
const systemConfig = require("../../config/system")
const md5 = require("md5")
module.exports.authen = async (req,res) => {
    console.log("token khi da dang nhap",req.cookies.token);
    if(req.cookies.token){
        res.redirect(`${prefixAdmin}/dashboard`)
    }
    else{
      res.render(`admin/pages/login/login.pug`,{
        title: "Đăng nhập"
      })
    }
   
}
module.exports.loginPost = async (req,res) => {
    const email = req.body.email
    const password = req.body.password
    const user = await Account.findOne(
        {email: email,
         password: md5(password),
         delete: false
        }
    )
   if(!user){
    req.flash("error","Email hoac mat khau sai")
    const backUrl = req.get("referer") || "/admin/account";
    res.redirect(backUrl)
   }
   else if(user.status == "inactive"){
     req.flash("error","Tai khoan bi vo hieu hoa")
    const backUrl = req.get("referer") || "/admin/account";
    res.redirect(backUrl)
   }
    res.cookie('token',user.token)
    res.redirect(`${prefixAdmin}/dashboard`)
}
module.exports.logout = async (req,res) => {
    res.clearCookie("token")
    res.redirect(`${prefixAdmin}/auth/login`)
}