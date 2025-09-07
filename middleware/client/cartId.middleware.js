const Cart = require("../../models/cart.model")
module.exports.cartId = async (req,res,next) => {
    if(!req.cookies.cartId){
        const cart = new Cart()
        await cart.save()
        const expriesCookie = 365 * 24 * 60 * 60 * 1000
        res.cookie("cartId",cart._id)
    }
    else {
        //lay ra gio hang 
    }
    next()
}