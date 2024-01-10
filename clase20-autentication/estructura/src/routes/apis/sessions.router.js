const { Router } = require('express')


const router = Router()


// estrategia uno
router.post('/register', async (req, res)=>{
    
    
    res.send({
        status: 'success',
        payload: 'register'
    })
})

router.post('/login', async (req, res)=>{
   
    res.json('login succes')
})




module.exports = router

