const userAccount = require("../../models/userAccount.model")
var md5 = require('md5')
require("dotenv").config()
const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
})
const OTP = require("../../models/forgot-password.model")
const generateNumber = require("../../helper/generateNum")
module.exports.forgotPassword = async (req,res) => {
    res.render("client/pages/forgotPassword/index.pug")
}

module.exports.forgotPasswordPost = async (req,res) => {
     if(req.body.email){
        email = req.body.email
        account = await userAccount.findOne({email: email})
        if(account){
          const obj = {
            email : req.body.email,
            otp : generateNumber(8),
          }
          try {
            const otpObj = new OTP(obj)
            otpObj.save()
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: obj.email,
                subject: "Mã OTP của bạn đây nè",
                text: obj.otp,
            }
            transporter.sendMail(mailOptions,(error,info) =>{
                    if(error){
                        return console.log("error occured",error)
                    }
                    console.log("email sent successfully",info.response);
                    
                })
          } catch (error) {
            console.log(error);
            return
          }
          res.redirect("/forgot-password/otp")
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
module.exports.forgotPasswordOTPinput = async (req,res) => {
    res.render("client/pages/forgotPassword/otpInput.pug")
}
module.exports.forgotPasswordOTPinputPost= async (req,res) => {
    console.log(req.body);
    if(req.body.otp){
        const otp = req.body.otp
        const isOtpCorrect = await OTP.findOne({otp: otp})
        console.log("day ne ",isOtpCorrect);
        
        if(isOtpCorrect){
            // Kiểm tra thời gian tạo OTP
            const now = new Date();
            const otpCreatedAt = isOtpCorrect.createdAt;
            const timeDiff = (now - otpCreatedAt) / 1000; // thời gian tính bằng giây
            
            console.log(`OTP created at: ${otpCreatedAt}`);
            console.log(`Current time: ${now}`);
            console.log(`Time difference: ${timeDiff} seconds`);
            
            if(timeDiff <= 180) { // 180 giây = 3 phút
                const user = await userAccount.findOne({email: email})
                res.cookie('userToken',user.userToken)
                res.redirect("/forgot-password/resetPassword")
            } else {
                req.flash("error", "OTP đã hết hạn");
                const backUrl = req.get("referer") || "/";
                res.redirect(backUrl)
            }
        }
        else{
            req.flash("error", "OTP không đúng hoặc đã hết hạn");
            const backUrl = req.get("referer") || "/";
            res.redirect(backUrl)
        }
        }
        else{
        req.flash("error","otp chua nhap ")
    }
    }
    

module.exports.resetPassword = async (req,res) => {
    res.render("client/pages/forgotPassword/resetPassword.pug")
}
module.exports.resetPasswordPost = async (req,res) => {
    const passwordHashed = md5(req.body.password)
    const userToken = req.cookies.userToken
    await userAccount.updateOne({userToken: userToken},{password:passwordHashed})
    req.flash('success','Đổi mật khẩu thành công')
    const backUrl = req.get("referer") || "/";
    res.redirect("/")
}