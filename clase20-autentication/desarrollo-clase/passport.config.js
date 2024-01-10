const passport = require('passport')
const local    = require('passport-local')
// const { usersModel } = require('../models/users.model')
const UserDaoMongo = require('../daos/Mongo/userDao.mongo.js')
const { createHash, isValidPassword } = require('../utils/hashPassword.js')

const LocalStrategy = local.Strategy
const userService   = new UserDaoMongo() 

exports.initializePassport = () => {
    // una estrategia es un middleware
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) => {
        try {
            const {first_name, last_name } = req.body
            let userFound = await userService.geUsertBy({email: username})
            if(userFound) return done(null, false)

            let newUser = {
                first_name, 
                last_name,
                email: username,
                password: createHash(password)
            }
            let result = await userService.createUser(newUser)
            return done(null, result)

        } catch (error) {
            return done('Error al crear un usuario: '+error)
        }
    })) 

    // guardar y recuperra credenciales del usuario de session

    passport.serializeUser((user, done)=>{
        done(null, user.id)
    })
    passport.deserializeUser(async (id, done)=>{
        let user = await userService.geUsertBy({_id: id})
        done(null, user)
    })

    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done)=>{
        try {
            const user = await userService.geUsertBy({email: username})            
            if(!user) {
                console.log('User not found')
                return done(null, false)
            }
                        
            if(!isValidPassword(password, {password: user.password})) return done(null, false)
            return done(null, user)
        } catch (error) {
            return done(error)
        }
    }))
}