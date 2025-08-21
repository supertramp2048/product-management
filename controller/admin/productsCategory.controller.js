const Category = require("../../models/category.model")
module.exports.productsCategory = async (req,res)=> {
    let find ={
        delete: false,
    }
   const categories = await Category.find(find)
   res.render("admin/pages/productsCategory/index.pug",{
        categories: categories
    })
}
module.exports.createNewCategoryPage = async (req,res) => {
    res.render("admin/pages/productsCategory/createNewCategory.pug")
}
module.exports.postNewCategory = async (req,res) => {
  req.body.thumbnail = `${req.file.path}`
  console.log(req.body);
  const newCategory = new Category(req.body)
  newCategory.save()
  .then(() => req.flash("success", "Added a new category successfully") )
  .catch(() => req.flash("error", "Added a new category fail"))
    const backUrl = req.get("referer") || "/admin/products";
    res.redirect(backUrl)
}
module.exports.changeStatus = async (req,res) => {
    const status = req.params.status
    const id = req.params.id
    await Category.updateOne({_id:id},{status: status})
    const backUrl = req.get("referer") || "/admin/products";
    res.redirect(backUrl)
}
module.exports.fixCategoryPage = async (req,res) => {
    let id= req.params.id
    const category = await Category.findOne({_id: id})
    res.render("admin/pages/productsCategory/fixCategory.pug",{
        Category: category
    })
}
module.exports.fixCategory = async (req,res) => {
    if (req.file) {
        req.body.thumbnail = req.file.path
    }
    console.log(req.params.id);
    await Category.updateOne({_id: req.params.id},req.body)
    req.flash("success","cap nhat category thanh cong")
   const backUrl = req.get("referer") || "/admin/productsCategory";
   res.redirect(backUrl);
}
module.exports.deleteCategory = async (req,res) => {
    let id = req.params.id
    try {
    await Category.deleteOne({_id: id})
    req.flash("success", "delete category successfully")
    const backUrl = req.get("referer") || "/admin/products";
    res.redirect(backUrl)
    }
    catch(err){
        req.flash("error", "delete category fail")
    }
    
}