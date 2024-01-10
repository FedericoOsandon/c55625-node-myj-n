const {Schema, model} = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const usersCollection = 'users'

const UsersSchema = Schema({
    first_name: {
        type: String,
        index: true,
        required: true
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true    
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    }
})

UsersSchema.plugin(mongoosePaginate)

const usersModel = model(usersCollection, UsersSchema)

module.exports = {
    usersModel
}