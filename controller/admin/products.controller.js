// [GET] /admin/products
const Products = require("../../models/product.model")
const filterStatus = require("../../helper/filterStatus")
const search = require("../../helper/search")
module.exports.getProducts = async (req, res) => {
    // filter here
    const btnClicked = filterStatus(req.query)
    // search
    const searchObject = search(req.query)
     let find = {
        delete: false
    };
    
    if(searchObject.keySearch){
        find.title = searchObject.regex
    }
    if (req.query.status) {
        find.status = req.query.status
    }
// pagination 
    let objectPagination = {
       currentPage: 1,
       limitItems: 4
    }
    if(req.query.page){
        objectPagination.currentPage = parseInt(req.query.page)
    }
    objectPagination.skip = (objectPagination.currentPage - 1)*objectPagination.limitItems
    //console.log(objectPagination.skip);
    const numberOfProduct = await Products.countDocuments(find)
    const totalPage = Math.ceil(numberOfProduct/objectPagination.limitItems)
    objectPagination.totalPage = totalPage
   // console.log("number of page is "+totalPage);
    const products = await Products.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip)
    res.render("admin/pages/products/index.pug", {
        products: products,
        btnClicked: btnClicked,
        keySearch: searchObject.keySearch,
        pagination: objectPagination
    });
} 
module.exports.putProducts = async (req,res) => {
    res.send("the put data")
} 