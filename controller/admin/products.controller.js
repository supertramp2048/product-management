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
    const products = await Products.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip).sort({position: 1})
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
    // hien thi thong bao cap nhat thanh cong bang flash 
    req.flash('success','cap nhat trang thai san pham thanh cong')
    const backUrl = req.get("referer") || "/admin/products";
    res.redirect(backUrl)
}
//[PATCH] admin/products/change-status-all  doi status cua nhieu san pham
module.exports.putAllProducts = async (req, res) => {
    //console.log(req.body);
    const statusAll = req.body.statusAll

    const ids = req.body.ids.split(", ")
    const idWithPosObj = ids.map(item =>  {
        let [id,position] = item.split("-")
        return {id: String(id), position: Number(position)}
    })
    switch (statusAll) {
        case "active":
            if ((statusAll) && (ids.length > 0)) {
                await Products.updateMany({ _id: { $in: ids } }, { $set: { status: "active" } }, { multi: true });
                req.flash('success','cap nhat trang thai san pham thanh cong')
            }
            else {
                return
            }
            break;
        case "inactive":
            if ((statusAll) && (ids.length > 0)) {
                await Products.updateMany({ _id: { $in: ids } }, { status: "inactive" }, { multi: true });
                req.flash('success','cap nhat trang thai san pham thanh cong')
            }
            else {
                return
            }
            break;
        case "deleteAll":
            if ((statusAll) && (ids.length > 0)) {
                await Products.updateMany({ _id: { $in: ids } }, { delete: true })
                 req.flash('success','delete all products successfully')
            }
            else {
                return
            }
            break;
        case "changePosition":
            if((statusAll) && (ids.length >0 )){
               await Products.bulkWrite(idWithPosObj.map(item =>({
                updateOne: {
                    filter: {_id: item.id},
                    update: {position: item.position}
                }
               })))
               req.flash('success','cap nhat vi tri san pham thanh cong')
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
    const positionFix = req.body.positionFixForm
    const descriptionFix = req.body.descriptionFixForm
    const stockFix = req.body.stockFixForm    
    const discountFix = req.body.discountFixForm
    // const p = title + ", " + thumbnail + ", " + deletedFix + ", " + statusFix + ", " + priceFix
    if (1) {
        await Products.updateOne(
            {
                _id: id
            },
            {
                title: title,
                thumbnail: thumbnail,
                delete: deletedFix,
                status: statusFix,
                position: positionFix,
                price: priceFix,
                discountPercentage: discountFix,
                description: descriptionFix,
                stock: stockFix,
                updateAt: this.updateAt
            }
        )
    }
    // res.send(p)
    req.flash('success','sua thong tin san pham thanh cong')
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
    req.flash('success','Delete product successfully')
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
    req.flash('success','Delete all product successfully')
    const backUrl = req.get("referer") || "/admin/products";
    res.redirect(backUrl)
}
module.exports.newProduct = async (req,res) => {
    res.render("admin/pages/products/createNewProduct.pug",{
        title: "new product"
    })
}
module.exports.createNewProduct = async (req,res) =>{
    let title = req.body.title
    let deleted = req.body.deleted
    let status = req.body.status 
    let price = req.body.price 
    let position = req.body.position
    let description = req.body.descriptionCreateForm
    let stock = req.body.stock
    let discount = req.body.discount
    req.body.thumbnail = `/uploads/${req.file.filename}`
    console.log(req.body.thumbnail);
    let thumbnail = req.body.thumbnail
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
        createAt: this.createAt
    })
    req.flash("success","Add a new product successfully")
    const backUrl = req.get("referer") || "/admin/products";
    res.redirect(backUrl)
}
