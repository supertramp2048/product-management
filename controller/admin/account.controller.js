const { defaultAvatar } = require("../../config/system")
const Account = require("../../models/account.model")
const Role = require("../../models/role.model")
var md5 = require('md5')
module.exports.accountPage = async (req,res) => {
    let find = {
        delete: false
    }
    const accounts = await Account.find(find)
    res.render("admin/pages/accounts/index.pug",{
        accounts:accounts,
    })
}
module.exports.newAccount = async (req,res) => {
    let find = {
        delete: false
    }
    const roles = await Role.find()
    res.render("admin/pages/accounts/newAccount.pug",{
        roles: roles
    })
}
module.exports.newAccountPost = async (req,res) => {
    try {
        let encryptedPassword = md5(req.body.password)
        req.body.password = encryptedPassword
        req.body.avatar = `${req.file.path}`
    } catch (error) {
        req.body.avatar = defaultAvatar
    }
    // console.log(req.body);
    let role = req.body.role_id
    const arrRole = role.split("_")
    console.log(arrRole);
    let obj = req.body
    obj.role_id = arrRole[0]
    obj.role = arrRole[1]
    // console.log(obj);
    let existedEmail = await Account.findOne({
        email: req.body.email,
        delete: false
    })
    let existedPhone = await Account.findOne({
        phone: req.body.phone,
        delete: false
    })
    if(existedEmail){
        req.flash("error","email da duoc dang ky")
        const backUrl = req.get("referer") || "/admin/account";
        res.redirect(backUrl)
        return
    }
    else if(existedPhone){
        req.flash("error","sdt da duoc dang ky")
        const backUrl = req.get("referer") || "/admin/account";
        res.redirect(backUrl)
        return
    }
    await Account.insertOne(obj)
    req.flash("success","dang ky tai khoan thanh cong")
    const backUrl = req.get("referer") || "/admin/account";
    res.redirect(backUrl)
}
module.exports.deleteAccount = async (req,res) => {
    let id = req.params.id
    try {
        await Account.updateOne({_id: id},{delete: true})
        req.flash("success","Xoa thanh cong")
        const backUrl = req.get("referer") || "/admin/account";
        res.redirect(backUrl)
    } catch (error) {
        console.log(error);
        req.flash("error","xoa that bai")
        const backUrl = req.get("referer") || "/admin/account";
        res.redirect(backUrl)
    }
}
module.exports.editAccount = async (req,res) => {
    let account = await Account.findOne({_id: req.params.id})
     let find = {
        delete: false
    }
    const roles = await Role.find()
    res.render("admin/pages/accounts/editAccount.pug",{
        roles:roles,
        account: account
    })
}
module.exports.editAccountPatch = async (req,res) => {
    console.log("id ",req.params.id);
    
    const oldAccount = await Account.findOne({_id: req.params.id})
    console.log("old Account ",oldAccount);
    
    try {
        req.body.avatar = `${req.file.path}`
    } catch (error) {
        req.body.avatar = defaultAvatar
    }
    if (req.body.password != oldAccount.password) {
        console.log("old pass ",oldAccount.password);
        
        console.log("new pass ",req.body.password);
        
        req.body.password = md5(req.body.password);
    } else {
    delete req.body.password; // giữ nguyên password cũ trong DB
    }
    let role = req.body.role_id
    const arrRole = role.split("_")
    let obj = req.body
    obj.role_id = arrRole[0]
    obj.role = arrRole[1]
    let existedEmail = await Account.findOne({
        email: req.body.email,
        delete: false
    })
    let existedPhone = await Account.findOne({
        phone: req.body.phone,
        delete: false
    })
    if(existedEmail && obj.email != oldAccount.email){
        req.flash("error","email da duoc dang ky")
        const backUrl = req.get("referer") || "/admin/account";
        res.redirect(backUrl)
        return
    }
    if(existedPhone && obj.phone != oldAccount.phone){
        req.flash("error","sdt da duoc dang ky")
        const backUrl = req.get("referer") || "/admin/account";
        res.redirect(backUrl)
        return
    }
    
        await Account.updateOne({email: obj.email},obj)
        req.flash("success","cap nhat tai khoan thanh cong")
        const backUrl = req.get("referer") || "/admin/account";
        res.redirect(backUrl)
}