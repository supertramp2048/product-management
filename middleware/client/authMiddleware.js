const userAccounts = require("../../models/userAccount.model")
module.exports = async (req,res,next) => {
    const userToken = req.cookies.userToken
    console.log(userToken);
    console.log("Middleware chạy cho path:", req.path);
    const user = await userAccounts.findOne({userToken: userToken}).select("-password")
    console.log(user);
    if (!user) {
        // Xoá cookie nếu token không hợp lệ, tránh lặp redirect
        res.clearCookie('userToken');
    }

    // Có user, gán vào res.locals và cho đi tiếp
    res.locals.user = user;
    next();
} 
