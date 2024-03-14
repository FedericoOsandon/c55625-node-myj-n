const { Router } = require('express')
const userRouter = require('./users.router.js')
const viewsRouter = require('./views.router.js')
const sessionsRouter = require('./sessions.router.js')
const pruebaRouter = require('./prueba.router.js')
const productsRouter = require('./products.router.js')
const { uploader } = require('../utils/upoloader.js')

const router = Router()



// router.use('/', viewsRouter)
router.use('/api/sessions', sessionsRouter)
router.use('/pruebas', pruebaRouter)
router.use('/api/users', userRouter)
router.use('/api/products', productsRouter)
router.use('/api/carts', ()=>{})
router.post('/uploader', uploader.single('myFile'), (req, res)=>{

    res.send('Imagen subida')
})
module.exports = router
// dao -> data access object