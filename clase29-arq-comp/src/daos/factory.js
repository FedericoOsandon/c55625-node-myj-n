
let ProductDao

switch ('MONGO') {
    case 'FILE':
        //importa el dao de las entidades con persistencia en archivo
        break;
        case 'MEMORY':
            //importa el dao de las entidades con persistencia en memoria
            
            break;
            
            
        default:
            // ().default
            // const {defa} = await import('./aslfjd')
            // const ProductDao = (await import('ruta/del/archivo')).default
            //importa el dao de las entidades con persistencia en base de datos
            const ProductDaoMongo = require("./Mongo/productsDao.mongo");
            ProductDao = ProductDaoMongo
        break;
}

module.exports = {
    ProductDao
}

