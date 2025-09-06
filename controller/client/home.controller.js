const createTree = require("../../helper/createTree")
const products = require("../../models/product.model")
module.exports.index = async (req,res) =>{
    let find = {
        delete: false,
        status: "active"
    }
    let sort = {
        "createdBy.createAt": -1
    }
    const newProducts = await products.find(find).limit(10).sort({"createdBy.createAt": -1})
    res.render("client/pages/home/index.pug",{
        title: "Home",
        products: newProducts
    })
}