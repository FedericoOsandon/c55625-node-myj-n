// const express = require('express')
const express = require('express')

const userRouter = require('./routes/users.router.js')
const { uploader } = require('./helpers/uploader.js')


const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))
// app.use('/static', express.static(__dirname+'/public'))

// app.use(( req, res, next)=>{
//     console.log('time: ', Date.now())
//     next()
// })

app.post('/single', uploader.single('myFile'), (req, res)=>{
    res.send('archivo subido')
})

// localhost:8080  /api/users
app.use('/api/users', userRouter)

app.get('/api/products', (req, res)=>{
    res.send('get productos')
})
app.post('/api/products', (req, res)=>{
    res.send('post productos')
})
app.put('/api/products', (req, res)=>{
    res.send('put productos')
})
app.delete('/api/products', (req, res)=>{
    res.send('delete productos')
})

app.use(( err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send('error de server')
})


app.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto ${PORT}`)
})
