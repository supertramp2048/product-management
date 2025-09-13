const createTree = require("../../helper/createTree")
const Categories = require("../../models/category.model")
module.exports.category = async (req,res,next) => {
    let find = {
        delete: false
    }
    const oldRecords = await Categories.find(find).lean()
    const newRecords = createTree.tree(oldRecords)// In dạng đẹp, dễ đọc
    res.locals.layoutCategory = newRecords
    next()
}