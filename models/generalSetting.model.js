require('dotenv').config();
const mongoURL = process.env.MONGO_URL
const mongoose = require('mongoose')
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
const generalSettingSchema = new mongoose.Schema({
    mainLogo: String,
    nameCompany: String,
    companyLogo: String,
    slogan: String,
    address: String,
    email: String,
    hotline: String,
    socialMedia:[
        {
        logoSocialMedia: String,
        linkSocialMedia: String,
        }
        ]
    },
{timestamps: true});

// Tạo TTL index cho createdAt field với thời gian 180 giây (3 phút)
const generalSetting = mongoose.model("generalSetting",generalSettingSchema,"generalSettings");
module.exports = generalSetting
