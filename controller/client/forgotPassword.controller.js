const userAccount = require("../../models/userAccount.model")
const OTP = require("../../models/forgot-password.model")
const generateNumber = require("../../helper/generateNum")
module.exports.forgotPassword = async (req,res) => {
    res.render("client/pages/forgotPassword/index.pug")
}
// module.exports.forgotPasswordOTPinput = async (req,res) => {
//     res.render("client/pages/forgotPassword/otpInput.pug")
// }
module.exports.forgotPasswordPost = async (req,res) => {
     const OTP_EXPIRES = 10;
     if(req.body.email){
        email = req.body.email
        account = await userAccount.findOne({email: email})
        if(account){
          const obj = {
            email : req.body.email,
            otp : generateNumber(8),
          }
          console.log(obj);
          
          const otpObj = new OTP(obj)
          otpObj.save()
          res.render("client/pages/forgotPassword/otpInput.pug",{email: email})
        }
        else{
            req.flash("error","Email chua dang ky tai khoan")
            const backUrl = req.get("referer") || "/";
            res.redirect(backUrl)
        }
    }
    else{
        req.flash("error","Email chua nhap khoan")
        const backUrl = req.get("referer") || "/";
        res.redirect(backUrl)
        
    }
}
module.exports.forgotPasswordOTPinputPost= async (req,res) => {
    console.log(req.body);
    if(req.body.otp){
        const otp = req.body.otp
        const email = req.body.email
        const isOtpCorrect = await OTP.findOne({otp: otp, email: email})
        if(isOtpCorrect){
                res.render("client/pages/forgotPassword/resetPassword.pug",{email: req.body.email})
            }
        else{
            await OTP.deleteOne({_id: isOtpCorrect._id});
            req.flash("error", "OTP đã hết hạn");
            const backUrl = req.get("referer") || "/";
            res.redirect(backUrl)
        }
        }
        else{
        req.flash("error","otp chua nhap ")
    }
    }
    

// module.exports.resetPassword = async (req,res) => {
//     req.render("client/pages/forgotPassword/resetPassword.pug")
// }
module.exports.resetPasswordPost = async (req,res) => {
    if(req.body.password){
        res.send("OK")
    }
    else{
        req.flash("error","mat khau chua dang ky tai khoan")
        const backUrl = req.get("referer") || "/";
        res.redirect(backUrl)
    }
}