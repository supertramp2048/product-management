module.exports.tokenCheck = async (req,res,next) => {
    if(!req.cookies.userToken){
       return res.redirect('/');
    }
    next()
} 