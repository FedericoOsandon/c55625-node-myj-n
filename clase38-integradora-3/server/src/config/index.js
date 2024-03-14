const { connect } = require('mongoose')
const dotenv = require('dotenv')
const { commander } = require('../utils/commander')

const { mode } = commander.opts()

dotenv.config({
    path: mode === 'development' ? './.env.development' : './.env.production' 
})

exports.configApp = {
    port:           process.env.PORT,
    gmail_user:     process.env.GMAIL_USER,
    gmail_password: process.env.GMAIL_PASSWORD
}





exports.connectDb = async () => {
    await connect('mongodb://127.0.0.1:27017/c55625')
    console.log('Base de datos conectada')
}