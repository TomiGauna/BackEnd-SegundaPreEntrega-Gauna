const socket = io();

let messagespot = document.getElementById("message-list")

socket.on('obtainMsg', (msg) => {
    messagespot.innerHTML = "";
    message.forEach((message)=> {
        const user = message.user
        const messages = message.msg
        const uElement = document.createElement("p")
        const mElement = document.createElement("p")
        uElement.textContent = user;
        mElement.textContent = messages;
        messagespot.appendChild(uElement)
        messagespot.appendChild(mElement) 
    })
})

/* let user;
let chatInput = document.getElementById('chatbox')
Swal.fire ({
    title: 'Welcome to our store!',
    input: 'text',
    text: 'Write down your e-mail in order to ask questions',
    inputValidator: (value) => {
        return !value && 'Writing a user name is mandatory'
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    socket.emit('authenticated', user);
})

chatInput.addEventListener('keyup', ev => {
    if (ev.key === 'Enter') {
        if (chatInput.value.trim().length > 0) {
            const msgData = {user: user, message: chatInput.value}
            socket.emit('msg', msgData);
            chatInput.value = "";
        }
    }
})

socket.on('uploadingMessages', data => {

  

    let log = document.getElementById('messagespot');
    let messages = "";

    data.forEach(message => {
        messages += `${message.user}: ${message.message}</br>`;
    });

    log.innerHTML = messages;
})

socket.on('newUserConnected', data => {
    if (!user) return;
    console.log(data);
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        title: `${data} joined the chat`,
        icon: 'success'
    })
}) */