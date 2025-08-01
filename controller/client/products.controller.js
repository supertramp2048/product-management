const Products = require("../../models/product.model")
module.exports.products= async(req,res)=> {
    console.log(req.query.status);
    
    let find = {
       delete: false
    };
    if(req.query.status){
        find.status = req.query.status
    }

    const products = await Products.find(find)
    res.render("client/pages/products/index.pug",{
       products: products
    });
} 