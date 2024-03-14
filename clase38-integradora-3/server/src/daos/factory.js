const { connectDb } = require("../config");

let UserDao
let ProductDao

switch ('MONGO') {
    case 'FILE':
        
        break;
    case 'MEMORY':
        
        break;

    default:
        connectDb()
        let UserDaoMongo = require("./Mongo/usersDaoMongo")
        UserDao = UserDaoMongo
        
        let ProductDaoMongo = require("./Mongo/productDao.mongo");
        ProductDao = ProductDaoMongo
        break;
}

module.exports = {
    UserDao,
    ProductDao
}