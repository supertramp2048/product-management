// them dotenv để có thể dùng được các biến môi trường
require('dotenv').config()
// thêm cloudinary và multer-storage-cloudinary
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// khai báo các thông tin để kết nối với cloudinary và lấy ảnh upload lên đó
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'CloudinaryDemo',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }
});

module.exports = {
    storage 
};