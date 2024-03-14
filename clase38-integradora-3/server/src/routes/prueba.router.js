const { Router } = require('express')
const { sendEmail } = require('../utils/sendEmail')

const router = Router()


router.get('/email', (req, res) => {
    const user = {
        first_name: 'federico'
    }
    const html = `<h1 style='color: blue;'>Bienvenido ${user.first_name}</h1>`
    sendEmail('projectodigitalgen@gmail.com', 'email de prueba', html)
    res.send('Email enviado')
})

module.exports = router