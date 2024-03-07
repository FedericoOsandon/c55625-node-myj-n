const express = require('express')


const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.get('/', (req, res) => {
    res.send('hello docker')
})
app.get('/simple', (req, res) => {
    let sum = 0
    for (let i = 0; i < 1000000; i++) {
        sum += i        
    }
    res.send(`La suma es ${sum}`)
})


app.get('/compleja', (req, res) => { 
    let sum = 0
    for (let i = 0; i < 4e8; i++) {
        sum += i        
    }
    res.send(`La suma es ${sum}`)
})

const PORT = 8080


app.listen(PORT, err => {
    if (err)  logger.fatal(err)

    console.log(`Escuchando en el puerto ${PORT}`)
})















