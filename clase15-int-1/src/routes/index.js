const { Router } = require('express')
const userRouter = require('./users.router.js')
const viewsRouter = require('./views.router.js')
const { uploader } = require('../utils/upoloader.js')

const router = Router()

router.post('/uploader', uploader.single('myFile'), (req, res)=>{

    res.send('Imagen subida')
})

router.use('/', viewsRouter)
router.use('/api/users', userRouter)
router.use('/api/products', ()=>{})
router.use('/api/carts', ()=>{})

module.exports = router
// dao -> data access object