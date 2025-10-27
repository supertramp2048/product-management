console.log("chat js");
import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
import { FileUploadWithPreview } from 'https://unpkg.com/file-upload-with-preview@6/dist/index.js';
// file upload preview ------------------------
    const upload = new FileUploadWithPreview('my-unique-id',{
        multiple: true, 
        maxFileCount: 6
      });
//---------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
const chatContainer = document.querySelector(".chat-container")
window.onload = function (){
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
//sự kiện người ấn nưt gửi ảnh
const sendImgBtn = document.querySelector('.image_icon')
let imgBtnEvent = false
const divSendImg = document.querySelector(".custom-file-container")
sendImgBtn.addEventListener("click", ()=> {
    imgBtnEvent = !imgBtnEvent
    if(imgBtnEvent == false){
        divSendImg.classList.add("hidden")
    }
    else{
        divSendImg.classList.remove("hidden")
    }
})


//- end sự kiện người ấn nut gửi ảnh
const formSendMessage = document.querySelector("[formSendMessage]")
if(formSendMessage){
    formSendMessage.addEventListener("submit", async (e) =>{
        e.preventDefault()
        const content = e.target.elements.content.value;
        const files = upload.cachedFileArray; // Lấy danh sách file đã chọn
        const formData = new FormData() //tạo ra 1 form để gửi ảnh lên backend và up lên clound
        for(const file of files ){
            formData.append("images", file);
        }
        const res = await fetch('/chat/uploadImgs', { method: 'POST', body: formData });// post form này lên backend
        const data = await res.json();
        const imgs = data.files.map(f => f.path);
        //console.log('path: ',imgs);
        if(content || imgs.length > 0){
            // Tạo object chứa nội dung và file
            const messageData = {
                content: content,
                images: imgs.length > 0 ? imgs : null
            };
            //console.log(messageData);

            socket.emit('CLIENT_SEND_MESSAGE', messageData)
            e.target.elements.content.value = ""
            upload.resetPreviewPanel();
            upload.cachedFileArray = []
        }
    })
}
let divChat = document.querySelector(".chat")
const user_id = divChat.getAttribute("my-id") 
const inputChat = document.querySelector('input[name=content]')

socket.on("SERVER_RETURN_MESSAGE", (data) => {
    console.log(data);
    const newMessage = document.createElement("div");
    
    if(user_id == data.userId){
        newMessage.classList.add("message", "user");
    }
    else{
        newMessage.classList.add("message", "other");
    }
    
    newMessage.innerHTML = `
        <img class="avatar" src="${data.avatar}" />
        <div class="bubble">
            <span class="name">${data.userEmail}</span><br/>
            ${data.content}
        </div>
    `;
    
    if(data.images && data.images.length > 0){
        const imgsDiv = document.createElement("div");
        // Responsive grid: 2 cột trên mobile, 3 cột trên tablet, 4 cột trên desktop
        imgsDiv.classList.add(
            "grid", 
            "grid-cols-2",      // Mobile: 2 cột
            "sm:grid-cols-3",   // Tablet: 3 cột (≥640px)
            "md:grid-cols-4",   // Desktop: 4 cột (≥768px)
            "gap-2",            // Khoảng cách giữa các ảnh
            "mt-2"              // Margin top
        );
        
        for(let image of data.images){
            let imgTag = document.createElement("img");
            imgTag.classList.add(
                "w-full",           // Chiều rộng 100% của grid cell
                "h-24",             // Chiều cao cố định (96px)
                "sm:h-28",          // Tablet: 112px
                "md:h-32",          // Desktop: 128px
                "object-cover",     // Crop ảnh đẹp
                "rounded",          // Bo góc nhẹ
                "cursor-pointer"    // Con trỏ khi hover
            );
            imgTag.src = image;
            
            // Optional: Thêm event click để xem ảnh phóng to
            imgTag.addEventListener("click", () => {
                // Code xem ảnh phóng to ở đây
                window.open(image, "_blank");
            });
            
            imgsDiv.appendChild(imgTag);
        }
        
        newMessage.querySelector(".bubble").appendChild(imgsDiv);
    }
    
    divChat.appendChild(newMessage);
    chatContainer.scrollTop = chatContainer.scrollHeight;
});
const emojiBtn = document.querySelector(".emoji-btn")
const tooltip = document.querySelector('.tooltip')
Popper.createPopper(emojiBtn, tooltip)

emojiBtn.addEventListener ('click', () =>{
    console.log("oke");
    tooltip.classList.toggle('shown')
}) 
document.querySelector('emoji-picker').addEventListener('emoji-click', (event) =>{
     const icon = event.detail.unicode
     console.log(icon);
     
     inputChat.value = inputChat.value + icon
     const end = inputChat.value.length
     inputChat.setSelectionRange(end,end)
     inputChat.focus();
     typingFunc()
    });
let isTyping = false
const list_typing = document.querySelector(".inner-list-typing")
inputChat.addEventListener("focus", typingFunc)
function typingFunc(e) {
    e.preventDefault()
    isTyping = true
    socket.emit("CLIENT_IS_TYPING",isTyping)
}
inputChat.addEventListener("blur", notTypingFunc)
function notTypingFunc(e) {
    e.preventDefault()
    isTyping = false
    socket.emit("CLIENT_ISNOT_TYPING",isTyping)
}
if(list_typing){
        socket.on('SERVER_RETURN_CLIENT_IS_TYPING',(data) => {
        console.log(data.userId+" is typing "+data.isTyping);
        if(data.isTyping==true){
           const isExistTyping = list_typing.querySelector(`[user_id="${data.userId}"]`);
           console.log(isExistTyping);
           
            if(!isExistTyping){
                const boxTyping = document.createElement("div")
            boxTyping.setAttribute("user_id", data.userId)
            if(user_id == data.userId){
                boxTyping.classList.add("message", "user");
            }
            else{
                boxTyping.classList.add("message", "other");
            }
            boxTyping.innerHTML = `
            <img class="avatar" src="${data.avatar}" />
            <div class="bubble">
            <span class="name">${data.userEmail}</span><br/>
            <div class="typing">
            <span></span>
            <span></span>
            <span></span>
            </div>
            </div>
            `
            list_typing.appendChild(boxTyping)
          }
        }
    })
}
if(list_typing){
    socket.on('SERVER_RETURN_CLIENT_ISNOT_TYPING',(data) => {
    const boxTypingRemove = list_typing.querySelector(`[user_id="${data.userId}"]`)
    if(boxTypingRemove){
        list_typing.removeChild(boxTypingRemove)
    }
})
}
})
