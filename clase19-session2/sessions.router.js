const {Router } = require('express')
const { authentication } = require('../../middlewars/auth.middleware')
const { usersModel } = require('../../models/users.model')

const router = Router()

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
        password
    }
    const result = await usersModel.create(newUser)
    
    res.send({
        status: 'success',
        payload: {
            first_name: result.first_name,
            last_name: result.last_name,
            email: result.email,
            _id: result._id
        }
    })
})

router.post('/login', async (req, res)=>{
    const {email , password } = req.body
    // simulando consulta a la base de datos
    if (email === '' || password === '') {
        return res.send('todos los campos son obligatoris')
    }
    
    const user = await usersModel.findOne({email})
    if (!user) {
        return res.send('email o contraseña equivocado')
    }

    // validar si es el password
    if (password !== user.password) {
        return res.send('email o contraseña equivocado')
    }

    req.session.user = {
        user: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        admin: true
    }
    res.redirect('/')
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

