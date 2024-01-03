const {Router } = require('express')
const { authentication } = require('../../middlewars/auth.middleware')

const router = Router()


router.get('/', (req, res)=>{
    if (req.session.counter) {
        req.session.counter ++

        res.send(`Se visatado esta página ${req.session.counter}`)
    }else{
        req.session.counter = 1
        req.session.firts_name = 'fede' 
        res.send('Bienvenido a ecommerce coder')
    }
    // res.send('sessions')
})

router.get('/login', (req, res)=>{
    const {username , password } = req.query
    // simulando consulta a la base de datos
    if (username !== 'fede' || password !== 'fede123') {
        return res.send('login failed')
    }
    
    req.session.username  = username
    req.session.admin = true 

    res.send('login success')
})

router.get('/current', authentication, (req, res) => {
    res.send('info sensible que solo puede ver el admin')
})

router.get('/logout', (req, res)=>{
    req.session.destroy(err=>{
        if (err) return res.send({status: 'error', error: err})
    })
    res.send('logout exitoso')
})


// cookies
router.get('/setcookies', (req, res) => {
    // cookie par key value 
    res.cookie('coderCookie', 'Esta es una cookie muy poderosa.', {maxAge: 100000000*24}).send('cookies')
})
router.get('/setcookies', (req, res) => {
    // cookie par key value 
    res.cookie('signedCookie', 'Esta es una cookie muy poderosa.', {maxAge: 100000000*24, signed:true}).send('cookies')
})
router.get('/getCookies', (req, res) => {
    // console.log(req.cookies)
    console.log(req.signedCookies)
    
    // res.send(req.cookies)
    // cookie firmadas
    res.send(req.signedCookies)
})
router.get('/deletecookies', (req, res) => {
    
    res.clearCookie('coderCookie').send('delete cookies')
})

module.exports = router

