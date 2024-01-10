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
// cookie - session - store 
const cookieParser = require('cookie-parser')
const session = require('express-session')
// sessions 
const FileStore = require('session-file-store')
const MongoStore = require('connect-mongo')
const { connectDB } = require('./config/index.js')
// passport
const passport = require('passport')
const { initializePassport } = require('./config/passport.config.js')


const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))
app.use(cookieParser('p@l@br@seCret@'))

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/c55625', // uri -> superconjunto de la url
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        ttl: 15000000000,
    }),
    secret: 'secretCoder',
    resave: true, 
    saveUninitialized: true
}))

// middlewars de passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')
connectDB()

app.use('/', viewsRouter)
app.use('/api/users', userRouter)// crud de user (userManager uso completo)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/sessions', sessionsRouter)// login - register - logout (userMAnager)
 
app.use(( err, req, res, next)=>{
    console.error(err)
    res.status(500).send(`Error Server`)
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













