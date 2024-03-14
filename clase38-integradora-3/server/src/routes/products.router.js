const { Router } = require('express')
const ProductController = require('../controllers/products.controller')

const router = Router()
const {
    getProudcts,
    getProudct,
    createProudct,
    updateProudct,
    deleteProudct
} = new ProductController()

router.get('/', getProudcts)
router.get('/:id', getProudct)
router.post('/', createProudct)
router.put('/:id', updateProudct)
router.delete('/:id', deleteProudct)

module.exports = router