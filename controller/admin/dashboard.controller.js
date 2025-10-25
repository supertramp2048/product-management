// [GET] /admin/dashboard
const Orders = require("../../models/order.model")
const userAccounts = require("../../models/userAccount.model")
const Categories = require("../../models/category.model")
const Products = require("../../models/product.model")
module.exports.dashboard= async (req,res)=> {
    req.flash('success','welcome')
    let objDashboard = {}
    objDashboard.orderNumber = await Orders.countDocuments({deleted:false})

    objDashboard.activeUserAccounts = await userAccounts.countDocuments({delete: false})
    objDashboard.inactiveUserAccounts = await userAccounts.countDocuments({delete: true})
    
    objDashboard.activeCategorys = await Categories.countDocuments({status: "active"})
    objDashboard.inactiveCategorys = await Categories.countDocuments({status: "inactive"})

    objDashboard.activeProducts = await Products.countDocuments({status: "active",delete: false})
    objDashboard.inactiveProducts = await Products.countDocuments({status: "inactive",delete: false})
    objDashboard.deletedProducts = await Products.countDocuments({delete:true})
    console.log(objDashboard);
    
    res.render("admin/pages/dashboard/index.pug",{
        title: "Admin",
        objDashboard: objDashboard
    });
} 