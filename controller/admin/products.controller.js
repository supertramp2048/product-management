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
//[PATCH] admin/products/change-status-all  doi status cua nhieu san pham
module.exports.putAllProducts = async (req, res) => {
    //console.log(req.body);
    const statusAll = req.body.statusAll
    const ids = req.body.ids.split(", ")
    switch (statusAll) {
        case "active":
            if (statusAll && ids) {
                await Products.updateMany({ _id: { $in: ids } }, { $set: { status: "active" } }, { multi: true });
            }
            else{
                return
            }
            break;
        case "inactive":
            if (statusAll && ids) {
                await Products.updateMany({ _id: { $in: ids } }, { status: "inactive" }, { multi: true });
            }
            else{
                return
            }
            break;
        default:
            break;
    }
    const backUrl = req.get("referer") || "/admin/products";
    res.redirect(backUrl)
}
//[PATCH] admin/products/fix-product
module.exports.fixProduct = async (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const thumbnail = req.body.thumbnail
    const deletedFix = req.body.deletedFixForm
    const statusFix = req.body.statusFixForm
    const priceFix = req.body.priceFixForm
   // const p = title + ", " + thumbnail + ", " + deletedFix + ", " + statusFix + ", " + priceFix
    if(1){
        await Products.updateOne(
            {
                _id: id
            },
            {
               title: title,
               thumbnail: thumbnail,
               delete: deletedFix,
               status: statusFix,
               price: priceFix
            }
        )
    }
   // res.send(p)
    const backUrl = req.get("referer") || "/admin/products";
    res.redirect(backUrl)
}
module.exports.deleteProduct = async (req,res)=> {
    const idDeleteProduct = req.body.idDeleteProduct
    if(idDeleteProduct){
        await Products.updateOne({_id: idDeleteProduct},{$set: {delete: true, deletedAt: new Date()}})
    }
    else{
        return
    }
    const backUrl = req.get("referer") || "/admin/products";
    res.redirect(backUrl)
}
module.exports.deleteAllProducts = async (req,res) => {
    const ids = req.body.idsDeleteAll.split(", ")
    await Products.updateMany({_id: {$in: ids}},{delete: true})
    const backUrl = req.get("referer") || "/admin/products";
    res.redirect(backUrl)
}