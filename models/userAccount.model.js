require('dotenv').config();
const { defaultAvatar } = require('../config/system');
const generate = require("../helper/generate")
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
        console.error("Kết nối MongoDB account thất bại:", err.message);
        process.exit(1); // Dừng app nếu cần
    });
    const userAccountSchema = new mongoose.Schema({
        fullName: String,
        email: String,
        password: String,
        userToken:{
          type:String,
          default: generate(20)
        } ,
        phone: String,
        avatar:{
            type: String,
            default:defaultAvatar
        },
        status:String,
        delete: {
            type: Boolean,
            default: false
        },
        deleteAt: Date
    },{
        timestamps:true,
    })
    const userAccount = mongoose.model("userAccount",userAccountSchema,"userAccounts")
    module.exports = userAccount