const nodemailer = require('nodemailer')
const { configObject } = require('../config')

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: configObject.gmail_user_app,
        pass: configObject.gmail_pass_app
    }
})

exports.sendMail = async (destino, subject, html) => {
    return await transport.sendMail({
        from: 'Este mail lo envia <projectodigitalgen@gmail.com>',
        to: destino,
        subject,
        html,
        attachments: [{
            filename: 'nodejs.png',
            path: __dirname + '/nodejs.png',
            cid: 'node'
        }]
    })
}

// function ComponenteProtegerRuta = ({children, user}) => {
    
//     if(!user) return navigate('/login')    
//     return <>
//         {children}
//     </>
// } 

// <ComponenteProtegerRuta>
//     <ComponenteCart />
// </ComponenteProtegerRuta>