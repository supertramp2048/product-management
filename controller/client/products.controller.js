const Products = require("../../models/product.model")
const Category = require("../../models/category.model")
const search = require("../../helper/search")
module.exports.products = async (req, res) => {
    let find = {
        delete: false,
        status: "active"
    };
    let objectPagination = {
        currentPage: 1,
        limitItems: 10
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
        title: "Sản phẩm",
        products: products,
        pagination: objectPagination,
        keySearch: searchObject.keySearch,
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
module.exports.category = async (req,res) => {
    let find = {
        delete: false,
        status: "active"
    };
    let objectPagination = {
        currentPage: 1,
        limitItems: 10
    }
    if (isNaN(req.query.page)) {
        objectPagination.currentPage = 1
    }
    else {
        objectPagination.currentPage = req.query.page
    }
    let searchObject = search(req.query)
    if (searchObject.keySearch) {
        find.title = searchObject.regex
    }
    find.product_category_id = req.params.id
    const categories = await Category.find({delete:false})
    // ham de lay tat ca cac id category con thuoc category hien tai 
    async function getAllCategoryProduct(parent_id){
      const subs = await Category.find(
        {
          delete: false,
          parent_id: parent_id,
          status: "active"
        }
    )
       let allSubs = subs
    for( let item of subs){
          let child = await getAllCategoryProduct(item._id)
          allSubs = allSubs.concat(child)
    }
      return allSubs
    }
    let arr = await getAllCategoryProduct(req.params.id)
    let allCategories = []
    for(let item of arr){
        allCategories.push(item._id)
    }
    allCategories.push(req.params.id)
    find.product_category_id = {$in: allCategories}
    objectPagination.totalPage = Math.ceil(await Products.find(find).countDocuments() / objectPagination.limitItems)
    objectPagination.skipItems = (objectPagination.currentPage - 1) * objectPagination.limitItems
    const products = await Products.find(find).limit(objectPagination.limitItems).skip(objectPagination.skipItems).sort({position: 1})
    res.render("client/pages/products/categoryProducts.pug", {
        title:"Danh mục",
        products: products,
        pagination: objectPagination,
        keySearch: searchObject.keySearch,
    });
}