const { Router } = require('express')
const { authentication } = require('../../middlewars/auth.middleware')
const { usersModel } = require('../../models/users.model')
const { createHash, isValidPassword } = require('../../utils/hashPassword')
const passport = require('passport')

const router = Router()


// estrategia uno
// router.post('/register', async (req, res)=>{
//     const { first_name, last_name, email , password } = req.body
//     console.log(first_name, last_name, email, password)
//     // simulando consulta a la base de datos
//     if (first_name ==='' || password === "" || email === '' ) {
//         return res.send('faltan completar campos obligatorios')
//     }
    
//     const userFound = await usersModel.findOne({email})
//     if (userFound) {
//         return res.send({status: 'error', error: 'Ya existe el user'})
//     }
//     const newUser = {
//         first_name,
//         last_name,
//         email,
//         password: createHash(password)
//     }
//     const result = await usersModel.create(newUser)
    
//     res.send({
//         status: 'success',
//         payload: {
//             first_name: result.first_name,
//             last_name: result.last_name,
//             email: result.email,
//             _id: result._id
//         }
//     })
// })

// router.post('/login', async (req, res)=>{
//     const {email , password } = req.body
//     // simulando consulta a la base de datos
//     if (email === '' || password === '') {
//         return res.send('todos los campos son obligatoris')
//     }
    
//     const user = await usersModel.findOne({email})
//     if (!user) {
//         return res.send('email o contraseña equivocado')
//     }

//     // validar si es el password
//     // if (password !== user.password) {
//     //     return res.send('email o contraseña equivocado')
//     // }
 
//     if (!isValidPassword(password, { password: user.password })) {
//             return res.send('email o contraseña equivocado')        
//     }

//     req.session.user = {
//         user: user._id,
//         first_name: user.first_name,
//         last_name: user.last_name,
//         admin: true
//     }
//     res.json('login succes')
// })

// routes de passport

router.post('/register', passport.authenticate('register', {failureRedirect: '/api/sessions/failregister'}),(req, res)=>{
    res.json({status: 'success', message: 'user created'})

})

router.get('/failregister', (req, res) => {
    console.log('Fail strategy')
    res.send({status: 'error', error: 'Fialed'})
})

router.post('/login', passport.authenticate('login', {failureRedirect: '/api/sessions/faillogin'}), async (req, res)=>{
    if(!req.user) return res.status(400).send({status: 'error', error: 'invalid credential'})
    req.session.user = {
        email: req.user.email,
        first_name: req.user.first_name
    }
    res.send({status: 'success', message: 'login succcess'})
})
router.get('/faillogin', (req, res) => {
    res.send({error: 'failed login'})
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



module.exports = router

