const express       = require('express')
const appRouter     = require('./routes')
const { connectDb, configApp } = require('./config')
const handlebars    = require('express-handlebars')

const cookie        = require('cookie-parser')
const { initializePassport } = require('./passport-jwt/passport.config')
const passport = require('passport')

const app = express()
const PORT = configApp.port

connectDb()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(express.static(__dirname+'/public'))
app.use(cookie())
// config handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

initializePassport()
app.use(passport.initialize())

app.use(appRouter)

app.listen(PORT, err =>{
    if (err) {
        console.log(err)
    }
    console.log(`Server escuchando en puerto: ${PORT}`) 
})