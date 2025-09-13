const Carts = require("../../models/cart.model")
const Products = require("../../models/product.model")
const User = require("../../models/account.model")
const Order = require("../../models/order.model")
module.exports.checkout = async (req,res) => {
    try {
            const cartId = req.cookies.cartId
        let find = {
            _id: cartId
        }
        const cart = await Carts.findOne(find).lean()
        const ids = cart.Product.map(item => item.product_id.toString())
        const products = await Products.find({_id: {$in: ids}}).lean()
        const productMap = new Map (products.map(p => [p._id.toString(), p]))
        
        const cartMap = cart.Product.map(item => ({
            ...item,
            ...productMap.get(item.product_id)
          })
        )
        let total = 0 
        cartMap.forEach(item => {
            totalOneProduct = item.quantity * (item.price*item.discountPercentage / 100)
            total += totalOneProduct
        })
        res.render("client/pages/checkout/index.pug",{
            title: "Thanh toán",
            cart: cartMap,
            total: total
        })
        } catch (error) {
            res.render("client/pages/checkout/index.pug",{
            title: "Thanh toán",
            cart: [],
            total: total
        })
        }
}
module.exports.order = async (req,res) => {
    const cartId= req.cookies.cartId
    const userInfo = req.body
    const cart = await Carts.findOne({_id: cartId})
    let products=[]
    for(const item of cart.Product) {
        let objProduct = {
            product_id: item.product_id,
            price: 0,
            discountPercentage: 0,
            quantity: item.quantity
        }

        const product = await Products.findOne({_id: item.product_id}).select("price discountPercentage")
        objProduct.price = product.price
        objProduct.discountPercentage = product.discountPercentage
        products.push(objProduct)
    }
    console.log(cartId);
    console.log(userInfo);
    console.log(products);
    
    let objOrder = {
        cart_id: cartId,
        userInfo: userInfo,
        products: products
    }
    try {
        const order = new Order(objOrder)
        order.save()
        res.redirect(`/checkout/success/${order._id}`)
    } catch (error) {
         res.send("order failed")
    }
    
}
module.exports.success = async (req,res) => {
    const orderId = req.params.orderId
    console.log(orderId);
    
    const order = await Order.find()
    res.render("client/pages/checkout/success.pug");
    
}