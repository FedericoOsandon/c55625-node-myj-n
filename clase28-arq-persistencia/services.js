const { UserDao } = require('../daos/factory.js')
const { UserRepository }  = require('./user.ropository.js')


const usersService = new UserRepository(new UserDao())

module.exports = {
    usersService
}