// const { text } = require("express");

const socket = io()

let nam;
let textarea = document.querySelector('textarea');
let messageArea = document.querySelector(".message-section");

do {
    nam = prompt('Enter your name')
} while (!nam);

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})
 function sendMessage(message){
    let msg={
        user:nam,
        message:message.trim()
    }
    appendMessage(msg,'outgoing')
    textarea.value=''
    socket.emit('message',msg)
    scrollToBottom()
 }
 function appendMessage(msg,type){
     let maindiv = document.createElement('div');
     maindiv.classList.add(type,'message')
     let content =`<h4>${msg.user}</h4>
                    <p>${msg.message}</p>
                    `
    maindiv.innerHTML = content;
    messageArea.appendChild(maindiv);
 }
 socket.on('message',(msg)=> {
     appendMessage(msg,'incoming')
     scrollToBottom()
 })
 function scrollToBottom(){
     messageArea.scrollTop = messageArea.scrollHeight;
 }





//         let message = e.target.value
//         let msg = {
//             user: nam,
//             message: message
//         }
//         let maindiv = document.createElement('div');
//         let className = 'outgoing';
//         maindiv.classList.add(className, 'message');
//         let markup = `
//          <h4>${msg.user}</h4>
//          <p>${msg.message}</p>
//         `
//         maindiv.innerHTML = markup;
//        messageArea.appendChild(maindiv);
//     }
// })

