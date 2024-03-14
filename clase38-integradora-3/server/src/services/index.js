// importar repository y nuestros daos

const ProductDaoMongo = require("../daos/Mongo/productDao.mongo")
const UserDaoMongo = require("../daos/Mongo/usersDaoMongo")
const ProductRepository = require("./products.repository")
const UserRepository = require("./users.repository")



let productService = new ProductRepository(new ProductDaoMongo())
let userService    = new UserRepository(new UserDaoMongo) 

module.exports = {
    productService,
    userService
}