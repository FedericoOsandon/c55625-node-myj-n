const { productModel } = require("../../models/products.model")

class ProductDaoMongo { // manager
    constructor(){
        this.model = productModel
    }

    async getProducts(){
        return await this.model.find()
    }
    async getProduct(pid){
        return await this.model.findById({_id: pid})
    }
    async createProduct(newProduct){
        return await this.model.create(newProduct)
    }
    async updateProduct(pid, productToUpdate){
        return this.model.findByIdAndUpdate({_id: pid, productToUpdate})
    }
    async deleteProduct(pid){

    }
}

module.exports = ProductDaoMongo
