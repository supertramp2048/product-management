const Chat = require("../../models/chat.model")
const User = require("../../models/userAccount.model") 
module.exports.chat = async(req,res) => {
    if(res.locals.user){
    const userId = res.locals.user._id
    const userEmail = res.locals.user.email
    const avatar = res.locals.user.avatar
    // io.once de moi lan load lai trang no khong goi connection cho socket io nua
    _io.once('connection', (socket) => {
    console.log('a user connected');
        socket.on('CLIENT_SEND_MESSAGE', async (data) =>{
            // const image = data.images
            // console.log(data);
            
            console.log(data);
            const chat = new Chat({
                user_id: userId,
                content: data.content,
                images: data.images
            })
            await chat.save()
            // tra ve cho client
            _io.emit("SERVER_RETURN_MESSAGE",  {
            userId: userId,
            userEmail: userEmail,
            avatar: avatar,
            content: data.content
        })
        })
        socket.on('CLIENT_IS_TYPING', (data) =>{
            socket.broadcast.emit('SERVER_RETURN_CLIENT_IS_TYPING', {
                userId: userId,
                userEmail: userEmail,
                avatar: avatar,
                isTyping: data
            })
        })

        //
        socket.on('CLIENT_ISNOT_TYPING', (data) =>{            
            socket.broadcast.emit('SERVER_RETURN_CLIENT_ISNOT_TYPING', {
                userId: userId,
                userEmail: userEmail,
                avatar: avatar,
                isTyping: data
            })
        })
    });
    let chats = await Chat.find({deleted: false})
    for(var chat of chats){
        const infoUser = await User.findOne({
            _id: chat.user_id
        }).select("email avatar")
        chat.infoUser = infoUser
    }
    res.render("client/pages/chat/index.pug",{
        chats: chats,
        title: "Chat"
    })
    }
    else {
        res.render("client/pages/chat/index.pug",{
        title: "Chat"
        })
    }
}
