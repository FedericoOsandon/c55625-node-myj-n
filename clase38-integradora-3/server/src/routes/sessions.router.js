const { Router } = require('express')
const UserDaoMongo = require('../daos/Mongo/usersDaoMongo')
const { isValidPassword, createHash } = require('../utils/validatePassword')
const { generateToken } = require('../utils/createToken')
const { passportCall } = require('../passport-jwt/passportCall.middleware')
const { authorization } = require('../passport-jwt/authorization.middleware')

const router = Router()
const usersService = new UserDaoMongo()

router.post('/login', async (request, response)=>{
    const { email, password } = request.body
    const user = await usersService.getUser({email})
    if(!user) return response.status(401).send({status: 'error', message: 'No se encuentra el usuario'})

    // validar password
    if(!isValidPassword(password, {password: user.password})) return response.status(401).send({status: 'error', message: 'Datos ingresados incorrectos'})

    const token = generateToken({
        id: user._id,
        email: user.email,
        role: user.role
    })
    
    response.cookie('token', token, {
        maxAge: 60*60*1000*24,
        httpOnly: true
    }).send({
        status: 'success',
        message: 'logged'
    })
})

router.post('/register', async (request, response)=>{
    const { first_name, last_name, email, password } = request.body
    console.log(first_name, last_name, email, password)

    const user = await usersService.getUser({email})
    console.log(user)
    
    if(user) return response.status(401).send({status: 'error', message: 'El usuario con ese email ya existe'})

    const newUser = {
        first_name,
        last_name, 
        email,
        password: createHash(password)
    }
    let result = await usersService.createUser(newUser)

    console.log(result)
    const token = generateToken({
        id: result._id
    })


    response.cookie('token', token, {
        maxAge: 60*60*1000*24,
        httpOnly: true
    }).send({
        status: 'success',
        message: 'user create'
    })
})

router.get('/current', 
    // [passportCall('jwt'), authorization(['USER','ADMIN'])], 
    (request, response)=>{
        response.send('datos sensibles')
    }
)

router.post('/logout', (request, response)=>{
    response.send('logout')
})

module.exports = router