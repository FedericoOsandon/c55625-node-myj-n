const { Router } = require('express')

const router = Router()


router.get('/', (req, res)=>{
    res.send('get productos')
})
router.post('/', (req, res)=>{
    res.send('post productos')
})
router.put('/', (req, res)=>{
    res.send('put productos')
})
router.delete('/', (req, res)=>{
    res.send('delete productos')
})

module.exports = router