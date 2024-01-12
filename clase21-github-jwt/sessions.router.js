const { Router } = require('express')
const { authentication } = require('../../middlewars/auth.middleware')
const { usersModel } = require('../../models/users.model')
const { createHash, isValidPassword } = require('../../utils/hashPassword')
const passport = require('passport')
const { createToken, authenticationToken } = require('../../utils/jwt.js')

const router = Router()


// estrategia uno
router.post('/register', async (req, res)=>{
    const { first_name, last_name, email , password } = req.body
   
    if (first_name ==='' || password === "" || email === '' ) {
        return res.send('faltan completar campos obligatorios')
    }
    
    const userFound = await usersModel.findOne({email})
    if (userFound) {
        return res.send({status: 'error', error: 'Ya existe el user'})
    }
    const newUser = {
        first_name,
        last_name,
        email,
        password: createHash(password)
    }
    const result = await usersModel.create(newUser)
    const token = createToken({id: result._id})
    res.send({
        status: 'success',
        payload: {
            first_name: result.first_name,
            last_name: result.last_name,
            email: result.email,
            _id: result._id
        },
        token
    })
})

router.post('/login', async (req, res)=>{
    const {email , password } = req.body
   
    if (email === '' || password === '') {
        return res.send('todos los campos son obligatoris')
    }
    
    const user = await usersModel.findOne({email})
    if (!user) {
        return res.send('email o contraseña equivocado')
    }

    if (!isValidPassword(password, { password: user.password })) {
            return res.send('email o contraseña equivocado')        
    }

    const token = createToken({id: user._id, role: user.role })
    res.json({
        status: 'success',
        payload: {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
        },
        token
    })
})

router.get('/current', authenticationToken,(req, res)=>{
    res.send('datos sensibles')
})

// routes de passport

router.get('/github', passport.authenticate('github', {scope:['user:email']}), async (req,res)=>{})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/login'}),(req, res)=>{
    req.session.user = req.user
    res.redirect('/')

})

router.get('/logout', (req, res)=>{
    req.session.destroy(err=>{
        if (err) return res.send({status: 'error', error: err})
    })
    res.send('logout exitoso')
})



module.exports = router

