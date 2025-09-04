const systemConfig = require ("../../config/system")
const Account = require("../../models/account.model")
const Role = require("../../models/role.model")
module.exports.authRequire = async (req,res,next) => {
    const User = await Account.findOne({token: req.cookies.token}).select("-password")
    if(!req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    }
    else{
     if(!User){
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    }
    else{
    const Roles = await Role.findOne({_id: User.role_id})
    console.log("nhom quyen ",Roles);
    
    res.locals.rolesCurrent = {permission: Roles.permission}
    res.locals.user = User
    console.log(req.cookies.token);
    next()
    }
    }
    
}