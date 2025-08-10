
const mongoose = require('mongoose')
// mongoose.connect('mongodb://127.0.0.1:27017/product-test-01')
mongoose.connect("mongodb://127.0.0.1:27017/product-test-01", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Kết nối MongoDB thành công"))
    .catch((err) => {
        console.error("Kết nối MongoDB thất bại:", err.message);
        process.exit(1); // Dừng app nếu cần
    });
const productSchema = new mongoose.Schema({
    title: String,
    thumbnail: String,
    delete: Boolean,
    price: Number,
    status: String,
    deletedAt: Date,
    description: String,
    discountPercentage: Number,
    stock: Number,
    position: Number
})
const Product = mongoose.model('product',productSchema , 'products')
module.exports = Product