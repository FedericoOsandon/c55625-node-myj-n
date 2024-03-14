const { createTransport } = require('nodemailer')
const { configApp } = require('../config')

const transport = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: configApp.gmail_user,
        pass: configApp.gmail_password
    }
})

const from = 'Servicio de mensajería de server ecommerce <projectodigitalgen@gmail.com>'

const sendEmail = async (toEmail, subject, body) => {
    return await transport.sendMail({
        from,
        to: toEmail,
        subject,
        html: body
    })
}

module.exports = {
    sendEmail
}