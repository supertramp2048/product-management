// [GET] /admin/products
const Products = require("../../models/product.model")
module.exports.products= async(req,res)=> {
    const products = await Products.find({})
    res.render("admin/pages/products/index.pug",{
       products: products
    });
} 