
module.exports.signUpValidate = (req,res,next) =>{
  const email = req.body.email
  const phone = req.body.phone 
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^0\d{9}$/;
  const passRegex = /^.{8,}$/;
  if(emailRegex.test(email) && phoneRegex.test(phone)){
    next()
  }
  else{
    req.flash("error","Nhap lai email va so dien thoai")
    res.redirect("/register")
    return
  }
 
}
module.exports.resetPassword = (req,res,next) => {
  const password = req.body.password
  const reEnterPassword = req.body.reEnterPassword
  if(password == reEnterPassword){
    next()
  }
  else{
    req.flash("error","Mật khẩu và xác nhận mật khẩu không giông nhau")
    const backUrl = req.get("referer") || "/";
    res.redirect(backUrl)
    return
  }
}