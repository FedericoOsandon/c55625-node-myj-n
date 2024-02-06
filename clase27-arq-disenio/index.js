const { connect } = require("mongoose")
const dotenv = require('dotenv')
const { program } = require("../utils/commander")
const MongoSingleton = require("./MongoSingleton")

const { mode } = program.opts()
console.log('mode config: ', mode)
dotenv.config({
    path: mode === 'production' ? './.env.production' : './.env.development' 
})

const configObject = {
    PORT: process.env.PORT || 4000,
    mongo_url: process.env.MONGO_URL,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    gh_client_id:'',
    gh_client_secret: ''
}

const connectDB = async () => {
    try {
        await MongoSingleton.getInstance(process.env.MONGO_URL)
        console.log('Base de datos conectada')   
    } catch (err) {
        console.log(err)
    }
} 

module.exports = {
    configObject,
    connectDB
}