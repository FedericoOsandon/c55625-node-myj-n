const { Router } = require('express')
const ProductDaoMongo = require('../../daos/Mongo/productManagerMongo.js')

const router = Router()
const productsService = new ProductDaoMongo()

router.get('/', async (req, res)=>{
    try {       
        // console.log(products)
        res.send({
            status: 'success',
            payload: 'products'
        })
        
    } catch (error) {
        console.log(error)
    }
})
router.post('/', async (req, res)=>{
    try {
        const newProduct = req.body
        
        
        res.send({status: 'success', payload: newProduct})
    } catch (error) {
        console.log(error)
    }
})
router.put('/', (req, res)=>{
    res.send('put productos')
})
router.delete('/', (req, res)=>{
    res.send('delete productos')
})

module.exports = router