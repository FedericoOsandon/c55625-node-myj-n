const { connect } = require("mongoose")

exports.connectDB = async () => {
    try {
        await connect('mongodb://127.0.0.1:27017/c55625')
        console.log('Base de datos conectada')   
    } catch (err) {
        console.log(err)
    }
} 