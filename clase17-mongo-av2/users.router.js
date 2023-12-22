const { Router } = require('express')
const { usersModel } = require('../../models/users.model')

const router = Router()
//

// const userManager = new UserManagerMongo().
router.get('/', async (req, res) =>{
    // sinc o async ?
    try {
        // const users = await usersModel.find({}).limit(50) // 5000 -> 100
        const users = await usersModel.paginate({gender: 'Female'}, {limit: 5, page: 445}) 
        res.send(users)
        
    } catch (error) {
        console.log(error)
    }
})


module.exports = router


