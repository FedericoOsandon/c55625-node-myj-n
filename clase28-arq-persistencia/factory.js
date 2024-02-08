const { configObject } = require('../config/index.js')

let UserDao
let ProductDao

// console.log('persistence factory: ',configObject.persistence)

switch (configObject.persistence) {
    case 'MONGO':
        const UserDaoMongo = require('./Mongo/userDao.mongo.js')
        UserDao = UserDaoMongo

        const ProductDaoMongo = require('./Mongo/productDao.mongo.js')
        ProductDao = ProductDaoMongo
        break;

    case 'SQL':

        break

    case 'FILE':
        // const UserDaoMongo = require('./File/usersDaoMemory')
        // UserDao = UserDaoMongo

        const ProductDaoFile = require('./File/productManagerFile.js')
        ProductDao = ProductDaoFile
        break

    default:
        break;
}

module.exports = {
    ProductDao,
    UserDao
}