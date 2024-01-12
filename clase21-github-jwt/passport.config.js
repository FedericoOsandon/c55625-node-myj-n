const passport = require('passport')
const local    = require('passport-local')
// const { usersModel } = require('../models/users.model')
const UserDaoMongo = require('../daos/Mongo/userDao.mongo.js')
const { createHash, isValidPassword } = require('../utils/hashPassword.js')
const GithubStrategy = require('passport-github2')

const LocalStrategy = local.Strategy
const userService   = new UserDaoMongo() 

exports.initializePassport = () => {
    // una estrategia es un middleware
    
    passport.use('github', new GithubStrategy({
        clientID: '',
        clientSecret: '',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accesToken, refreshToken, profile, done)=> {
        try {
            console.log(profile)
            let user = await userService.geUsertBy({email: profile._json.email})
            if (!user) {
                // para registrar en caso de que no exista
                let userNew = {
                    first_name: profile.username,
                    last_name: profile.username,
                    email: profile._json.email,
                    password: '123456'
                }
                let result = await userService.createUser(userNew)
                return done(null, result)
            }
            done(null, user)

        } catch (error) {
            return done(error)
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

    
}