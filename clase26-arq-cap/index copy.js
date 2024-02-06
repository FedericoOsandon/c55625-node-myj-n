const {Router} = require('express')
const userRouter = require('./apis/users.router.js')
const productsRouter = require('./apis/products.router.js')
const viewsRouter = require('./views.router.js')
const cartsRouter = require('./apis/carts.router.js')
const ordersRouter = require('./apis/orders.router.js')
const sessionsRouter = require('./apis/sessions.router.js')
const pruebasRouter = require('./apis/pruebas.router.js')

const router = Router()

router.use('/', viewsRouter)
router.use('/api/users', userRouter)

router.use('/api/products', productsRouter) // ->

router.use('/api/carts', cartsRouter)
router.use('/api/orders', ordersRouter)
router.use('/api/sessions', sessionsRouter)
router.use('/pruebas', pruebasRouter)

router.use('*', (req, res)=>{
    res.status(404).send('not found')
})

router.use(( err, req, res, next)=>{
    console.error(err)
    res.status(500).send(`Error Server`)
})

module.exports = router