// [GET] /admin/dashboard
module.exports.dashboard=(req,res)=> {
    res.flash('success','welcome')
    res.render("admin/pages/dashboard/index.pug",{
        title: "Admin"
    });
} 