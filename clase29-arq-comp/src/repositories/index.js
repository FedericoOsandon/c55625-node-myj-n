
const { ProductDao } = require("../daos/factory.js");
const ProductRepository = require("./prooducts.repository.js");


const productService = new ProductRepository(new ProductDao)

module.exports = {
    productService
}