const { Router } = require('express')
const { usersModel } = require('../models/users.model')
const { authentication } = require('../middlewars/auth.middleware')

const router = Router()


router.get('/users', authentication, async (req, res) => {
    const { numPage=1, limit=10 } = req.query
    const {
        docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page
    } = await usersModel.paginate({}, {limit, page: numPage, sort: {first_name: 1}, lean: true})
    // console.log(result)
    res.render('users', {
        users: docs,
        hasNextPage,
        hasPrevPage,
        prevPage,
        nextPage,
        page
    })
})

router.get('/', (req,res)=> {
    res.render('index', {
        title: 'Mercadito Fede', 
        name: 'Fede el mejor',
        style: 'index.css'
    })
})

router.get('/prod', (req, res) => {
    
    const userMock = {
        title: 'Mercadito Fede', 
        name: 'Fede el mejor',
        role:  'admin'
    }

    res.render('products', {
        title: userMock.title, 
        name: userMock.name,
        isAdmin: userMock.role === 'admin',
        products: productMock,
        style: 'products.css'
    })
})

module.exports = router



// const Saludos = () => {}