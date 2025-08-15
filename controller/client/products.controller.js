const Products = require("../../models/product.model")
const search = require("../../helper/search")
module.exports.products = async (req, res) => {
    let find = {
        delete: false,
        status: "active"
    };
    let objectPagination = {
        currentPage: 1,
        limitItems: 4
    }
    if (isNaN(req.query.page)) {
        objectPagination.currentPage = 1
    }
    else {
        objectPagination.currentPage = req.query.page
    }
    if (req.query.status) {
        find.status = req.query.status
    }
    let searchObject = search(req.query)
    if (searchObject.keySearch) {
        find.title = searchObject.regex
    }

    objectPagination.totalPage = Math.ceil(await Products.find(find).countDocuments() / objectPagination.limitItems)
    objectPagination.skipItems = (objectPagination.currentPage - 1) * objectPagination.limitItems
    //console.log(objectPagination.totalPage);
    const products = await Products.find(find).limit(objectPagination.limitItems).skip(objectPagination.skipItems).sort({position: 1})
    res.render("client/pages/products/index.pug", {
        products: products,
        pagination: objectPagination,
        keySearch: searchObject.keySearch
    });
} 
module.exports.productDetail = async (req,res) => {
    let find = {
        _id: req.params.id,
        status: "active"
    }
    // let id = req.params.id
    var product = await Products.findOne(find)
    res.render("client/pages/products/productDetail.pug",{
        product: product
    })
}