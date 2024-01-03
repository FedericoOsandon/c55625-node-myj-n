const express = require('express')
const handlebars = require('express-handlebars')
const userRouter = require('./routes/apis/users.router.js')
const productsRouter = require('./routes/apis/products.router.js')
const viewsRouter = require('./routes/views.router.js')
const cartsRouter = require('./routes/apis/carts.router.js')
const ordersRouter = require('./routes/apis/orders.router.js')
const sessionsRouter = require('./routes/apis/sessions.router.js')
const { uploader } = require('./helpers/uploader.js')
const { Server } = require('socket.io')
const { orderModel } = require('./models/orders.model.js')
const { connect } = require('mongoose')

const cookieParser = require('cookie-parser')
const session = require('express-session')


const app = express()
const PORT = 8080

const connectDb = async () => {
    try {
        await connect('mongodb://127.0.0.1:27017/c55625')
        console.log('Base de datos conectada')   
    } catch (err) {
        console.log(err)
    }
}

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))
app.use(cookieParser('p@l@br@seCret@'))
app.use(session({
    secret: 'secretCoder',
    resave: true, 
    saveUninitialized: true
}))

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')
connectDb()


app.use('/', viewsRouter)
app.use('/api/users', userRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/sessions', sessionsRouter)

app.use(( err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send('error de server')
})

const httpServer = app.listen(PORT, err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto ${PORT}`)
})


const io = new Server(httpServer)
// const messageService = new MessageDaoMongo()
let messagesArray = [] /// -> [{}, {}, {}] messageService.find()

io.on('connection', socket => {
    console.log('Nuevo cliente conectado')

    socket.on('message', data => {
        messagesArray.push(data)// messageService.create(data)
        io.emit('messageLogs', messagesArray)
    })
})













