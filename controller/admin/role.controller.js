const Role = require("../../models/role.model")
module.exports.role = async(req,res) => {
    let find = {
        delete: false
    }
    const GroupRoles =await Role.find(find)
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
module.exports.fixRoleGroup = async(req,res) => {
    let id = req.params.id
    const role = await Role.findOne({_id:id})
    res.render("admin/pages/role/fixRole.pug",{
        role: role
    })
}
module.exports.fixRoleGroupPatch = async (req,res) => {
    let id = req.params.id
    let newRole = req.body
    console.log(newRole);
    await Role.updateOne({_id:id},newRole)
    const backUrl = req.get("referer") || "/admin/products";
    res.redirect(backUrl)
}
module.exports.deleteRole = async (req,res) => {
    let id = req.params.id
    try {
        await Role.deleteOne({_id:id})
        req.flash("success","Xoa thanh cong")
        const backUrl = req.get("referer") || "/admin/products";
        res.redirect(backUrl)
    } catch (error) {
        req.flash("error","xoa that bai")
        const backUrl = req.get("referer") || "/admin/products";
        res.redirect(backUrl)
    }
    
}