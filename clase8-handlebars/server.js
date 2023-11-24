// const express = require('express')
const express = require('express')
const handlebars = require('express-handlebars')

const userRouter = require('./routes/apis/users.router.js')
const viewsRouter = require('./routes/views.router.js')
const { uploader } = require('./helpers/uploader.js')



const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))

// motor de plantilla

// app.engine('handlebars', handlebars.engine())
// app.set('view engine', 'handlebars')
// app.set('views', __dirname + '/views')

// manera mas corta de escribir
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

// localhost:8080  /api/users
app.use('/api/users', userRouter)
app.use('/views', viewsRouter)


app.use(( err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send('error de server')
})

// console.log('fede el mejor')
app.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto ${PORT}`)
})
