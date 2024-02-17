const { Router } = require('express')
const { fork } = require('node:child_process')
const { sendMail } = require('../../utils/sendMail')
const { sendSms } = require('../../utils/sendSms')

const router = Router()


router.get('/sendsms', (req, res) => {
    sendSms(`Bienvenido`, {first_name: 'Federico', last_name: 'Osandón', phone: '+34613652154'})
    res.send('SMS enviado')
})


router.get('/sendmail', (req, res) => {

    const user = {
        email: 'projectodigitalgen@gmail.com',
        first_name: 'Federico',
        last_name: 'Osandón'
    }
    // llamar una función enviar el mail
    const to      = user.email
    const subject = 'Esto es un mail de prueba'
    const html    = `<div>
        <h2>Bienvenido a prueba de email ${user.first_name} ${user.last_name}</h2>
    </div>` 
    sendMail(to, subject, html)


    res.send('mail enviado')
})

module.exports = router