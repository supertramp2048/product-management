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
const categorySchema = new mongoose.Schema({
    parent_id: String,
    title: String,
    slug: { type: String, slug: "title" },
    thumbnail: String,
    delete: Boolean,
    status: String,
    position: Number,
    updateAt: Date,
    createAt: Date,
    deletedAt: Date,
    description: String
},
{ timestamps: true })
const Category = mongoose.model('category',categorySchema,'categorys')
module.exports = Category