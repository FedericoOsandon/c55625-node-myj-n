const {Router}   = require('express')
const {generateUser} = require('../utils/generateUserFaker.js')

const router = Router()

router.get('/mocks', (req, res)=> {
    let users = []
    for (let i = 0; i < 100; i++) {
        users.push(generateUser())       
    }
    res.send({
        status: 'success',
        payload: users
    })
})



module.exports = router