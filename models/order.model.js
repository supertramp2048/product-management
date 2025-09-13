require('dotenv').config();
const mongoURL = process.env.MONGO_URL
const mongoose = require('mongoose')
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug)
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Kết nối MongoDB thành công")
        console.log('[DB] host:', mongoose.connection.host);
        console.log('[DB] name:', mongoose.connection.name); // <- phải đúng DB bạn mở trong Atlas
    })
    .catch((err) => {
        console.error("Kết nối MongoDB thất bại:", err.message);
        process.exit(1); // Dừng app nếu cần
    });
const orderSchema = new mongoose.Schema({
    //user_id: String,
    cart_id: String,
    userInfo: {
      fullname: String,
      phone: String,
      address: String
    },
    products: [{
      product_id: String,
      price: Number,
      discountpercentage: Number,
      qantity: Number
    }
    ],
    status: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    deleteAt: Date
},{
    timestamps: true
}) 
const order = mongoose.model("Order",orderSchema,"Orders")
module.exports = order