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

    if (searchObject.keySearch) {
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
    if (isNaN(req.query.page)) {
        objectPagination.currentPage = 1
    }
    else {
        objectPagination.currentPage = parseInt(req.query.page)
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems
    //console.log(objectPagination.skip);
    const numberOfProduct = await Products.countDocuments(find)
    const totalPage = Math.ceil(numberOfProduct / objectPagination.limitItems)
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
// [PATCH] admin/products/change-status/:status/:id  doi status cua mot san pham 
module.exports.putProducts = async (req, res) => {
    // console.log(req.params);
    const status = req.params.status
    const id = req.params.id
    const result = await Products.updateOne({ _id: id }, { status: status })
    //console.log(result);
    const backUrl = req.get("referer") || "/admin/products";
    res.redirect(backUrl)
}
//[PATCH] admin/products/change-status-all/:statusAll/:ids  doi status cua nhieu san pham
module.exports.putAllProducts = async (req, res) => {
    //console.log(req.body);
    const statusAll = req.body.statusAll
    const ids = req.body.ids.split(", ")
    console.log("o day "+statusAll);
    console.log(ids);
    
    switch (statusAll) {
        case "active":
            await Products.updateMany({ _id: { $in: ids } }, { $set: { status: "active" }},{multi: true});
            break;
        case "inactive":
            await Products.updateMany({ _id: { $in: ids } }, { status: "inactive" },{multi: true});
            break;
        default:
            break;
    }
    const backUrl = req.get("referer") || "/admin/products";
    res.redirect(backUrl)
}