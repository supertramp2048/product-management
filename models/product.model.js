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
const productSchema = new mongoose.Schema({
    title: String,
    slug: { type: String, slug: "title" },
    thumbnail: String,
    delete: Boolean,
    price: Number,
    status: String,
    deletedAt: Date,
    description: String,
    discountPercentage: Number,
    stock: Number,
    position: Number,
    updateAt: Date,
    createAt: Date
},
    { timestamps: true })
const Product = mongoose.model('product', productSchema, 'products')

module.exports = Product