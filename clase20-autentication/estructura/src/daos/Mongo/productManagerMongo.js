const { productModel } = require("../../models/products.model")

class ProductDaoMongo {
    constructor(){
        this.model = productModel
    }

   
}

module.exports = ProductDaoMongo
