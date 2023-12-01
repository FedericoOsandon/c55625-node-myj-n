const socket = io()
let user 
let chatBox     = document.querySelector('#chatBox')



Swal.fire({
    title: 'Indentifícate',
    input: 'text',
    text: 'Ingrese el usuario para identificarse',
    allowOutsideClick: false,
    inputValidator: value => {
        return !value && 'Necesitas escribir un nombre de usuario para continuar!!'     
    }
}).then(result => {
    user = result.value
    // console.log(user)
})

chatBox.addEventListener('keyup', evt => {
    if (evt.key === 'Enter') {
        if(chatBox.value.trim().length > 0){
            // console.log(user,chatBox.value)
            socket.emit('message', {user ,message: chatBox.value})
            chatBox.value = ''
        }
    }
})

socket.on('messageLogs', data => {
    let messageLogs = document.querySelector('#messageLogs') 
    let messages    = ''
    
    data.forEach(elementMensajes => {
        messages += `
            ${elementMensajes.user} dice: ${elementMensajes.message}<br>
        `
    })
    messageLogs.innerHTML = messages
    // console.log(data)
})