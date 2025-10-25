const generalSetting = require("../../models/generalSetting.model")
module.exports.getGeneralSetting = async (req,res,next) =>{
    const generalSettingObj = await generalSetting.findOne({})
    res.locals.generalSettingObj = generalSettingObj
    next()
}