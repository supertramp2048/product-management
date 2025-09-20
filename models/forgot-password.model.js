require('dotenv').config();
const mongoURL = process.env.MONGO_URL
const mongoose = require('mongoose')
const generateNumber = require('../helper/generateNum')
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
const forgotPasswordSchema = new mongoose.Schema({
    email: String,
    otp: String,
    createdAt: { type: Date, default: Date.now }
},
{timestamps: true});

// Tạo TTL index cho createdAt field với thời gian 180 giây (3 phút)
forgotPasswordSchema.index({ createdAt: 1 }, { expireAfterSeconds: 180 });
const ForgotPassword = mongoose.model("ForgotPassword",forgotPasswordSchema,"forgotPassword");
module.exports = ForgotPassword
