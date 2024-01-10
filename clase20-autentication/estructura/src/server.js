const express = require('express')
const handlebars = require('express-handlebars')
const userRouter = require('./routes/apis/users.router.js')
const productsRouter = require('./routes/apis/products.router.js')
const viewsRouter = require('./routes/views.router.js')
const cartsRouter = require('./routes/apis/carts.router.js')
const ordersRouter = require('./routes/apis/orders.router.js')
const sessionsRouter = require('./routes/apis/sessions.router.js')
const { Server } = require('socket.io')
const { connectDB } = require('./config/index.js')



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















