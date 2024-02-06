const { Router } = require('express')
const ProductController = require('../../controllers/products.controller')

const router = Router()
const productController = new ProductController

router.get('/',    productController.getProducts)

router.get('/:pid',    productController.getProduct)
router.post('/',   productController.createProduct)
router.put('/:pid',    productController.updateProduct)
router.delete('/:pid', productController.deleteProduct)

module.exports = router