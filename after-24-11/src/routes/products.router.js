const { Router } = require('express')
const ProductManagerFile = require('../managers/productsManagerFile')

const router = Router()
const productsService = new ProductManagerFile()
router
    .get('/', async (req, res)=> {
        const products = await productsService.getProducts()
        res.send({
            status: 'success', 
            payload: products
        })
    })
    .get('/:pid', async (req, res)=> {
        const {pid} = req.params
        const product = await productsService.getProduct(parseInt(pid))
        if (!product) {
            return res.status(400).send({
                status: 'error', 
                mensagge: 'No se encuentra el producto'
            })
        }
        res.send({
            status: 'success',
            payload: product
        })
    })
    .post('/', async (req, res)=> {
        const product = req.body
        res.send('post product ')
    })
    .put('/:pid', async (req, res)=> {
        const {pid} = req.params
        res.send('put product '+pid)
    })
    .delete('/:pid', async (req, res)=> {
        const {pid} = req.params
        res.send('delete product '+pid)
    })

module.exports = router