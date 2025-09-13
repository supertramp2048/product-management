const Carts = require("../../models/cart.model")
const Products = require("../../models/product.model")
const User = require("../../models/account.model")
module.exports.cart = async (req,res) => {
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
        totalOneProduct = item.quantity * (item.price - (item.price*(item.discountPercentage / 100)))
        console.log(totalOneProduct);
        
        total += totalOneProduct
    })
    res.render("client/pages/cart/index.pug",{
        title: "Giỏ hàng",
        cart: cartMap,
        total: total
    })
    } catch (error) {
        res.render("client/pages/cart/index.pug",{
        title: "Giỏ hàng",
        cart: []
    })
    }
    
}
module.exports.addToCartPost = async (req,res) => {
    try {
        const cartId = req.cookies.cartId
    const productId = req.params.productId
    const quantity = req.body.quantity
    const obj = {
        product_id: productId,
        quantity: quantity
    }
    const cart = await Carts.findOne({_id: cartId})
    const found = cart.Product.find(item => String(item.product_id) === String(productId) )
    if(found){
        found.quantity += Number(quantity);
        await cart.save();
    }
    else{
        await Carts.updateOne(
        { _id: cartId },       
        //{Product: []}           // Tìm document theo _id
        { $push: { Product: obj } }       // Thêm obj vào mảng Product
       );
    }
    req.flash("success","Them san pham thanh cong")
    const backUrl = req.get("referer") || "/admin/products";
    res.redirect(backUrl)
    } catch (error) {
        req.flash("error","Them san that bai")
        const backUrl = req.get("referer") || "/admin/products";
        res.redirect(backUrl)
    }
    
}
module.exports.updateCart = async (req,res) => {
    const action = req.params.action
    const productId = req.params.productId
    const cartId = req.cookies.cartId
    const cart = await Carts.findOne({_id:cartId})
    if(action=="delete"){
      let listProducts = cart.Product
      cart.Product = cart.Product.filter(item => item.product_id !== productId)
      await cart.save()
    }
    else if(action=="plus"){
        let find = cart.Product.find(item => item.product_id == productId)
        find.quantity+=1
        await cart.save()
    }
    else if(action=="minus"){
        let find = cart.Product.find(item => item.product_id == productId)
        find.quantity-=1
        if(find.quantity<=0){
            cart.Product = cart.Product.filter(item => item.product_id !== productId)
            await cart.save()
        }
        await cart.save()
    }
    const backUrl = req.get("referer") || "/cart";
    res.redirect(backUrl)
}