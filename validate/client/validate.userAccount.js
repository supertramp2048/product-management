
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