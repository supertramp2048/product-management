const { prefixAdmin } = require("../../config/system")
const Account = require("../../models/account.model")
const md5 = require("md5")
module.exports.authen = async (req,res) => {
    res.render('admin/pages/login/login.pug')
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
    res.redirect(`${prefixAdmin}/dashboard`)
}