const Role = require("../../models/role.model")
module.exports.role = async(req,res) => {
    let find = {
        delete: false
    }
    const GroupRoles =await Role.find(find)
    console.log(GroupRoles);
    
    res.render("admin/pages/role/index.pug",{
        roles: GroupRoles
    })
}
module.exports.newRole = async(req,res) => {
    res.render("admin/pages/role/newRole.pug")
}
module.exports.newRolePost = async(req,res) =>{
    await Role.insertOne(req.body)
    req.flash("success","them moi nhom quyen thanh cong")
    const backUrl = req.get("referer") || "/admin/products";
    res.redirect(backUrl)
}