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
    // category da cap
    const categories = await Category.find().lean()
    function createTree(arr,parent_id=""){
        var tree =[]
        arr.forEach(item => {
           if(item.parent_id == parent_id){
            const newItem = item
            const childrent = createTree(arr,item._id)
            if(childrent.length){
                newItem.childrent = childrent
            }
            tree.push(newItem)
           }
        })
        return tree
    }
    const newRecords =  createTree(categories)
    console.log(newRecords);
    
    // function printTree(arr,prefix=""){
    //     arr.forEach((item,index) => {
    //         const isLast = index == arr.length-1
    //         const connector = isLast ? "└── " : "├── "
    //         console.log(prefix+connector+item.title);
    //         if(item.childrent && item.childrent.length > 0){
    //             const newPrefix = prefix + (isLast ? "    " : "│   ") 
    //             printTree(item.childrent,newPrefix)
    //         }
            
    //     })
    // }
    // printTree(newRecords)
    //-------------
    objectPagination.totalPage = Math.ceil(await Products.find(find).countDocuments() / objectPagination.limitItems)
    objectPagination.skipItems = (objectPagination.currentPage - 1) * objectPagination.limitItems
    //console.log(objectPagination.totalPage);
    const products = await Products.find(find).limit(objectPagination.limitItems).skip(objectPagination.skipItems).sort({position: 1})
    res.render("client/pages/products/index.pug", {
        products: products,
        pagination: objectPagination,
        keySearch: searchObject.keySearch,
        categories: newRecords
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