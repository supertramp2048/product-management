const Role = require("../../models/role.model")
module.exports.permission = async (req,res) => {
    let find = {
        delete: false
    }
    const records = await Role.find(find)
    res.render("admin/pages/permission/index.pug",{
        title: "Phân quyền",
        records: records
    })
}
module.exports.changePermission = async (req,res) => {
    try {
        let permissionArr = JSON.parse(req.body.permission)
    const ops = permissionArr.map(item => ({
        updateOne: {
            filter: {_id: item.id},
            update: {$set: {permission: item.permission}}
        }
    }))
    await Role.bulkWrite(ops)
    req.flash("success","cap nhat thanh cong")
    const backUrl = req.get("referer") || "/admin/products";
    res.redirect(backUrl)
    } catch (error) {
        console.error(err);
        req.flash("error","cap nhat that bai")
        const backUrl = req.get("referer") || "/admin/products";
        res.redirect(backUrl)
    }
    
}