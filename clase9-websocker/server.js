// const express = require('express')
const express = require('express')
const handlebars = require('express-handlebars')

const userRouter = require('./routes/apis/users.router.js')
const productsRouter = require('./routes/apis/products.router.js')
const viewsRouter = require('./routes/views.router.js')
const { uploader } = require('./helpers/uploader.js')


const { Server } = require('socket.io') 



const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

app.use('/views', viewsRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productsRouter)


app.use(( err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send('error de server')
})

// console.log('fede el mejor')
const serverHttp = app.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto ${PORT}`)
})

const socketServer = new Server(serverHttp)
let arrayMensajes = []
socketServer.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    // socket.on('recibirMensajeCliente', data => {
    //     console.log(data)
    // })

    // socket.emit('solo-para-el-actual', 'Este lo debe recibir solo el socket actual')

    // socket.broadcast.emit('para-todos-menos-actual', 'Este evento lo verán todos los conectados, menos el actual')

    // socketServer.emit('evento-para-todos', 'este mensaje lo reciben todos')

    
    socket.emit('enviar-mensajes-cliente', arrayMensajes)

    socket.on('message', mensajes => {
        // console.log(mensajes)
        arrayMensajes.push({id: socket.id, message: mensajes })
        socketServer.emit('mensaje-recibido-cliente', arrayMensajes)
    })



})







