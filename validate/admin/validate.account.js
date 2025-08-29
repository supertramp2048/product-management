module.exports.account = (req,res,next) => {
    if(req.body.email){
        const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
        if(!emailRegex.test(req.body.email)){
          req.flash("error","email khong hop le")
          const backUrl = req.get("referer") || "/admin/account/newAccount";
          res.redirect(backUrl)
          return
        }
    }
    if(req.body.phone){
        const phoneRegex = /^0\d{9}$/;
        if(!phoneRegex.test(req.body.phone)){
            req.flash("error","so dien thoai khong hop le")
            const backUrl = req.get("referer") || "/admin/account/newAccount";
            res.redirect(backUrl)
            return
        }
    }
    if(req.body.password){
        const passRegex = /^\w{8,}$/;
        if(!passRegex.test(req.body.password)){
            req.flash("error","nhap password du 8 ky tu")
            const backUrl = req.get("referer") || "/admin/account/newAccount";
            res.redirect(backUrl)
            return
        }
    }
    next()
}