// [GET] /admin/products
require('dotenv').config();
const Products = require("../../models/product.model")
const filterStatus = require("../../helper/filterStatus")
const createTree = require("../../helper/createTree")
const Categories = require("../../models/category.model")
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
    // sort products 
    let sortChoice = req.query.sort
    let sortObj = {}
        switch(sortChoice){
            case "positionIncrease":
                sortObj={
                    position: 1
                }
                break;
            case "positionDecrease":
                sortObj={
                    position: -1
                }
                break;
            case "priceIncrease":
                sortObj={
                    price: 1
                }
                break;
            case "priceDecrease":
                sortObj={
                    price: -1
                }
                break;
            case "titleAZ":
                sortObj={
                    title: 1
                }
                break;
            case "titleZA":
                sortObj={
                    title: -1
                }
                break;
            default:
                sortObj={
                    position: 1
                }
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
    const products = await Products.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip).sort(sortObj).lean()
    const tiniMCEUploadUrl = process.env.URL_TINIMCE
    res.render("admin/pages/products/index.pug", {
        products: products,
        btnClicked: btnClicked,
        keySearch: searchObject.keySearch,
        pagination: objectPagination,
        sortChoice:sortChoice,
        tiniMCEUploadUrl:tiniMCEUploadUrl
    });
}
// [PATCH] admin/products/change-status/:status/:id  doi status cua mot san pham 
module.exports.putProducts = async (req, res) => {
    const status = req.params.status
    const id = req.params.id
    const result = await Products.updateOne({ _id: id }, { status: status })
    req.flash('success', 'cap nhat trang thai san pham thanh cong')
    const backUrl = req.get("referer") || "/admin/products";
    res.redirect(backUrl)
}
//[PATCH] admin/products/change-status-all  doi status cua nhieu san pham
module.exports.putAllProducts = async (req, res) => {
    //console.log(req.body);
    const statusAll = req.body.statusAll

    const ids = req.body.ids.split(", ")
    const idWithPosObj = ids.map(item => {
        let [id, position] = item.split("-")
        return { id: String(id), position: Number(position) }
    })
    switch (statusAll) {
        case "active":
            if ((statusAll) && (ids.length > 0)) {
                await Products.updateMany({ _id: { $in: ids } }, { $set: { status: "active" } }, { multi: true });
                req.flash('success', 'cap nhat trang thai san pham thanh cong')
            }
            else {
                return
            }
            break;
        case "inactive":
            if ((statusAll) && (ids.length > 0)) {
                await Products.updateMany({ _id: { $in: ids } }, { status: "inactive" }, { multi: true });
                req.flash('success', 'cap nhat trang thai san pham thanh cong')
            }
            else {
                return
            }
            break;
        case "deleteAll":
            if ((statusAll) && (ids.length > 0)) {
                await Products.updateMany({ _id: { $in: ids } }, { delete: true })
                req.flash('success', 'delete all products successfully')
            }
            else {
                return
            }
            break;
        case "changePosition":
            if ((statusAll) && (ids.length > 0)) {
                await Products.bulkWrite(idWithPosObj.map(item => ({
                    updateOne: {
                        filter: { _id: item.id },
                        update: { position: item.position }
                    }
                })))
                req.flash('success', 'cap nhat vi tri san pham thanh cong')
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
    let id = req.params.id
    let find = {
        delete: false,
        _id: id
    }
    const categories = await Categories.find({delete: false})    
    const newRecords = createTree.tree(categories)
    const product = await Products.findOne(find)
    const tiniMCEUploadUrl = process.env.URL_TINIMCE
    res.render("admin/pages/products/fixProduct.pug", {
        title: "fix product",
        product: product,
        categories: newRecords,
        tiniMCEUploadUrl:tiniMCEUploadUrl
    })
}
module.exports.fixProductProcess = async (req, res) => {
    if (req.file) {
        req.body.thumbnail = `${req.file.path}`
    }
    let objAccount = {
        account_id: res.locals.user._id,
        account_name: res.locals.user.fullName
    }
    await Products.updateOne({ _id: req.params.id }, 
    {
    $set: req.body,                    // cập nhật các field từ req.body
    $push: { createdBy: objAccount }    // push thêm vào mảng
    }
    )
    console.log(req.body);
    
    req.flash("success", "Updated a new product successfully")
    const backUrl = req.get("referer") || "/admin/products";
    res.redirect(backUrl)
}
module.exports.deleteProduct = async (req, res) => {
    const idDeleteProduct = req.body.idDeleteProduct
    if (idDeleteProduct) {
        await Products.updateOne({ _id: idDeleteProduct }, { $set: { delete: true, deletedAt: new Date() } })
    }
    else {
        return
    }
    req.flash('success', 'Delete product successfully')
    const backUrl = req.get("referer") || "/admin/products";
    res.redirect(backUrl)
}
module.exports.deleteAllProducts = async (req, res) => {
    if (req.body.idsDeleteAll) {
        const ids = req.body.idsDeleteAll.split(", ")
        await Products.updateMany(
            { _id: { $in: ids } },
            { delete: true }
        )
    }
    else {
        return
    }
    req.flash('success', 'Delete all product successfully')
    const backUrl = req.get("referer") || "/admin/products";
    res.redirect(backUrl)
}
module.exports.newProduct = async (req, res) => {
    let find = {
        delete: false,
        status: "active"
    }
    const categories = await Categories.find(find)
    let newRecords = createTree.tree(categories)
    const tiniMCEUploadUrl = process.env.URL_TINIMCE
    res.render("admin/pages/products/createNewProduct.pug", {
        categories:newRecords,
        title: "new product",
        tiniMCEUploadUrl: tiniMCEUploadUrl
    })
}
module.exports.createNewProduct = async (req, res) => {
    let title = req.body.title
    let deleted = req.body.deleted
    let status = req.body.status
    let price = req.body.price
    let position = req.body.position
    let description = req.body.description
    let stock = req.body.stock
    let discount = req.body.discount
    let objAccount = {
        account_id: res.locals.user._id,
        account_name: res.locals.user.fullName
    }
    
    // validate file
    // if (req.file.filename) {
    let thumbnail = req.file.path
    req.body.thumbnail = `${req.file.path}`
    
    // }
    // else {
    //     req.flash("error", "vui long nhap anh san pham")
    //     return
    // }
    await Products.insertOne({
        title: title,
        thumbnail: thumbnail,
        delete: deleted,
        status: status,
        price: price,
        position: position,
        description: description,
        stock: stock,
        discountPercentage: discount,
        createAt: this.createAt,
        createdBy: [objAccount]
    })
    console.log(description);
    
    req.flash("success", "Added a new product successfully")
    const backUrl = req.get("referer") || "/admin/products";
    res.redirect(backUrl)
    
}
module.exports.productDetail = async (req,res) => {
    let id = req.params.id
    let product = await Products.findOne({_id:id})
    res.render("admin/pages/products/productDetail.pug",{
        product: product
    })
}
