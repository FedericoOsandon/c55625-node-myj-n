const express = require('express')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
// cookie - session - store 
const cookieParser = require('cookie-parser')
// passport
const passport = require('passport')
const { initializePassport } = require('./config/passport.config.js')
const { connectDB, configObject } = require('./config/index.js')

const appRouter = require('./routes/index.js')
const { handleError } = require('./middlewars/error/handleError.js')
const { sumaNumeros } = require('proyecto-suma')

console.log(sumaNumeros(1,2,3,4,5))

const app = express()
const PORT = configObject.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))
app.use(cookieParser('p@l@br@seCret@'))

// middlewars de passport
initializePassport()
app.use(passport.initialize())


app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')
connectDB()

app.use(appRouter)
app.use(handleError)


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













