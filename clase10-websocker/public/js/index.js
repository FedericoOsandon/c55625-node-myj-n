const socket = io()

// socket.emit('recibirMensajeCliente', 'estoy usando socket y soy el cliente')

// socket.on('solo-para-el-actual', dataServer => {
//     console.log(dataServer)
// })
// socket.on('para-todos-menos-actual', dataServer => {
//     console.log(dataServer)
// })

// socket.on('evento-para-todos', dataServer => {
//     console.log(dataServer)
// })

socket.on('enviar-mensajes-cliente', data => {
    console.log(data)
})

const input = document.querySelector('#textInput')
const mensajesDiv = document.querySelector('#mensajes')

input.addEventListener('keyup', evt => {
    if (evt.key==='Enter') {
        socket.emit('message', input.value)
        input.value = ""
    }
})

socket.on('mensaje-recibido-cliente', arrayMensajes => {
    // console.log(arrayMensajes)
    let mensajes = ''
    arrayMensajes.forEach(mensaje => {
        mensajes += `<li>${mensaje.id} dice: ${mensaje.message}</li>`
    })
    mensajesDiv.innerHTML = mensajes
})