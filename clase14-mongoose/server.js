// const express = require('express')
const express = require('express')
const handlebars = require('express-handlebars')
const userRouter = require('./routes/apis/users.router.js')
const productsRouter = require('./routes/apis/products.router.js')
const viewsRouter = require('./routes/views.router.js')
const { uploader } = require('./helpers/uploader.js')
// importando socket .io
const { Server } = require('socket.io')
// importar mongoose
const { connect } = require('mongoose')

const app = express()
const PORT = 8080

const connectDb = async () => {
    //
    // await connect('mongodb+srv://Federico:Federico1@coderexample.hjzrdtr.mongodb.net/c55625?retryWrites=true&w=majority')
    await connect('mongodb://127.0.0.1:27017/c55625')
    console.log('Base de datos conectada')
}

connectDb()



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')


app.use('/', viewsRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productsRouter)

app.use(( err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send('error de server')
})

const httpServer = app.listen(PORT, err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto ${PORT}`)
})


const io = new Server(httpServer)

let messagesArray = []

io.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    socket.on('message', data => {
        messagesArray.push(data)
        io.emit('messageLogs', messagesArray)
    })
})













