const generalSetting = require("../../models/generalSetting.model")
module.exports.generalSetting = async (req,res) =>{
    res.render("admin/pages/generalSetting/index.pug",{
        title:"Cài đặt chung"
    }
    )
}
module.exports.foterSetting = async (req,res) => {
    res.render("admin/pages/generalSetting/footer.pug")
}
module.exports.foterSettingUpdate = async (req,res) => {
    if(req.file){
        req.body.companyLogo = req.file.path
    }
    let obj = req.body
    let socialMediaobj = JSON.parse(req.body.objSocialMedia)
    const objSetting = obj
    objSetting.socialMedia = socialMediaobj
    await generalSetting.updateOne({}, { $set: objSetting },{ upsert: true }  )
    const backUrl = req.get("referer") || "/admin/account";
    res.redirect(backUrl)
}
module.exports.logoSetting = async (req,res) => {
    res.send("ok")
}
module.exports.paymentSetting = async (req,res) => {
    res.send("ok")
}
module.exports.advertismentSetting = async (req,res) => {
    res.send("ok")
}