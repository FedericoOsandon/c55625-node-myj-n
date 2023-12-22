// const express = require('express')
const express = require('express')
const handlebars = require('express-handlebars')
const userRouter = require('./routes/apis/users.router.js')
const productsRouter = require('./routes/apis/products.router.js')
const viewsRouter = require('./routes/views.router.js')
const cartsRouter = require('./routes/apis/carts.router.js')
const ordersRouter = require('./routes/apis/orders.router.js')
const { uploader } = require('./helpers/uploader.js')
// importando socket .io
const { Server } = require('socket.io')
// importar mongoose
const { connect } = require('mongoose')
// order model
const { orderModel } = require('./models/orders.model.js')

const app = express()
const PORT = 8080

const connectDb = async () => {
    try {
        await connect('mongodb://127.0.0.1:27017/c55625')
        console.log('Base de datos conectada')   
        
        // let result = await orderModel.insertMany([
        //     { name: "Pepperoni", size: "small", price: 19, quantity: 10, date:"2021-03-13T08:14:30Z" },    
        //     { name: "Pepperoni", size: "medium", price: 20, quantity: 20, date :"2021-03-13T09:13:24Z"},    
        //     { name: "Pepperoni", size: "large", price: 21, quantity: 30, date :"2021-03-17T09:22:12Z"},    
        //     { name: "Cheese", size: "small", price: 12, quantity: 15, date :"2021-03-13T11:21:39.736Z" },    
        //     { name: "Cheese", size: "medium", price: 13, quantity:50, date : "2022-01-12T21:23:13.331Z"},    
        //     { name: "Cheese", size: "large", price: 14, quantity: 10, date : "2022-01-12T05:08:13Z"},    
        //     { name: "Vegan", size: "small", price: 17, quantity: 10, date : "2021-01-13T05:08:13Z"},    
        //     { name: "Vegan", size: "medium", price: 18, quantity: 10, date : "2021-01-13T05:10:13Z"}
        // ])
        // console.log(result)
    } catch (err) {
        console.log(err)
    }
}

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

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













