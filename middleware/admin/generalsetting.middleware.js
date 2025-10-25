const generalSetting = require("../../models/generalSetting.model")
module.exports.generalsetting = async (req,res,next) => {
    const generalSettingObj = await generalSetting.findOne({})
    res.locals.generalSettingObj = generalSettingObj
    next()
}