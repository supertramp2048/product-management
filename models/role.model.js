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
    const roleSchema = new mongoose.Schema({
         title: String,
         description : String,
         permission: {
              type: Array,
              default: []
         },
         delete: {
            type: Boolean,
            default: false
         },
         deletedAt: Date
    },
    {
        timestamps: true
    }
)

const Role = mongoose.model("Role",roleSchema,"roles")
module.exports = Role