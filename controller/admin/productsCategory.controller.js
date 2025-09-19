const Category = require("../../models/category.model")
const createTree = require("../../helper/createTree")

module.exports.productsCategory = async (req,res)=> {
    let find ={
        delete: false,
    }
   const categories = await Category.find(find).lean()
   const newCategories = createTree.tree(categories)
   console.log("day ne ",JSON.stringify(newCategories));
   
   res.render("admin/pages/productsCategory/index.pug",{
        categories: newCategories
    })
}
module.exports.createNewCategoryPage = async (req,res) => {
    let find = {
        delete: false
    }
    const categories = await Category.find(find).lean()
    const newCategories = createTree.tree(categories)
    res.render("admin/pages/productsCategory/createNewCategory.pug",{
         categories: newCategories
    })
}
module.exports.postNewCategory = async (req,res) => {
  req.body.thumbnail = `${req.file.path}`
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
    let find ={
        delete: false,
    }
   const categories = await Category.find(find).lean()
//    function createTree.tree(arr,parent_id = ""){
//     let tree =[]
//       arr.forEach(item => {
//          if(item.parent_id == parent_id){            
//            const newItem = { ...item }
//            const children = createTree.tree(arr,item._id)
//            if(children.length > 0 ){
//               newItem.child  = children
//            }
//            tree.push(newItem)
//          }
//       })
//     return tree
//    }
   const newCategories = createTree.tree(categories)
//    console.log(newCategories);
//    console.log(JSON.stringify(newCategories, null, 2));
//ham in ra cay category
   function titlePrint(arr, prefix = "") {
  arr.forEach((item, index) => {
    const isLast = index === arr.length - 1;
    const connector = isLast ? "└── " : "├── ";

    console.log(JSON.stringify(newCategories, null, 2));

    if (item.childrent && item.childrent.length > 0) {
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      titlePrint(item.childrent, newPrefix);
    }
  });
}
   console.log(JSON.stringify(newCategories));
   
   titlePrint(newCategories)
    let id= req.params.id
    const category = await Category.findOne({_id: id})
    res.render("admin/pages/productsCategory/fixCategory.pug",{
        Category: category,
        categories: newCategories
    })
}
module.exports.fixCategory = async (req,res) => {
    if (req.file) {
        req.body.thumbnail = req.file.path
    }
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
        return res.redirect("/admin/products"); 
    }
    
}
module.exports.uploadTiniMCE = async (req,res) => {
    if (!req.file?.path) return res.status(400).json({ error: 'Upload failed' });
    res.json({ location: req.file.path }); // URL CDN Cloudinary
}