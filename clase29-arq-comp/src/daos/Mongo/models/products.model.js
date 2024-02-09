const { Schema, model } = require('mongoose')

const productsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    thumbnail: String,
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

const productsModel = model('products', productsSchema)

module.exports = {
    productsModel
}