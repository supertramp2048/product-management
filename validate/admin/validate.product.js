module.exports.createPost = (req,res,next) => {
    if(!req.body.title) {
        req.flash("error","vui long nhap tieu de")
        const backUrl = req.get("referer") || "/admin/products";
        res.redirect(backUrl)
        return
    }
    if (!req.file) {
        req.flash("error", "Vui lòng chọn ảnh sản phẩm");
        const backUrl = req.get("referer") || "/admin/products";
        return res.redirect(backUrl);
    }
    next();
    
}