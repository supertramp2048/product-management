const Cart = require("../../models/cart.model")
module.exports.arrayLength = async (req,res,next) => {
    if(req.cookies.cartId){
        const cartId = req.cookies.cartId
        const cart = await Cart.findOne({_id: req.cookies.cartId}).lean()
        if(cart){
           const arr = cart.Product
        let count = 0
        arr.forEach(item => {
          count += item.quantity
        })
        res.locals.count = count
        }
    }
    next()
}