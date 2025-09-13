const userAccounts = require("../../models/userAccount.model")
module.exports = async (req,res,next) => {
    const userToken = req.cookies.userToken
    console.log(userToken);
    
    const user = await userAccounts.findOne({userToken: userToken})
    console.log(user);
    
    res.locals.user = user
    next()
} 
