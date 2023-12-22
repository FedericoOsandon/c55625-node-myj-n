const { Router } = require('express')
const { usersModel } = require('../models/users.model')

const router = Router()


router.get('/users', async (req, res) => {
    const { numPage, limit=10 } = req.query
    const {
        docs,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        page
    } = await usersModel.paginate({}, {limit, page: numPage, sort: 1, lean: true})
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



module.exports = router



// const Saludos = () => {}