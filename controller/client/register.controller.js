const userAccount = require("../../models/userAccount.model")
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
    }
    else if (isPhoneExited){
        req.flash("error","Số điện thoại đã được đăng ký")
        res.redirect("/register")
    }
    else {
       try {
        console.log("file: ",req.file);
        
        req.body.avatar = req.file.path
        const objUser = req.body
        const newUser = new userAccount(objUser)
        await newUser.save()
        res.cookie("userToken",newUser.userToken)
        console.log(req.body);
       } catch (error) {
        
       }
    }
    } catch (error) {
        console.log(error);
        
    }
    res.send("ok")
}