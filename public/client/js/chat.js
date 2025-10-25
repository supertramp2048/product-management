console.log("chat js");
import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
import { FileUploadWithPreview } from 'https://unpkg.com/file-upload-with-preview@6/dist/index.js';
    const upload = new FileUploadWithPreview('my-unique-id',{
        multiple: true, 
        maxFileCount: 6
      });
window.addEventListener('DOMContentLoaded', () => {
// file upload preview ------------------------
//var upload = new FileUploadWithPreview('my-unique-id')
//---------------------------------------------
const chatContainer = document.querySelector(".chat-container")
window.onload = function (){
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
const formSendMessage = document.querySelector("[formSendMessage]")
if(formSendMessage){
    formSendMessage.addEventListener("submit", async (e) =>{
        e.preventDefault()
        const content = e.target.elements.content.value;
        const files = upload.cachedFileArray; // Lấy danh sách file đã chọn
        console.log(files);
        if(content || files.length > 0){
            // Tạo object chứa nội dung và file
            const messageData = {
                content: content,
                images: files.length > 0 ? files : null
            };
            console.log(messageData);
            
            socket.emit('CLIENT_SEND_MESSAGE', {content: content,  images: files.length > 0 ? files : null})
            e.target.elements.content.value = ""
        }
        
    })
}
let divChat = document.querySelector(".chat")
const user_id = divChat.getAttribute("my-id") 
const inputChat = document.querySelector('input[name=content]')

socket.on("SERVER_RETURN_MESSAGE", (data) => {
    console.log(data);
    const newMessage = document.createElement("div")
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
    `
    divChat.appendChild(newMessage)
    chatContainer.scrollTop = chatContainer.scrollHeight;
})
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
