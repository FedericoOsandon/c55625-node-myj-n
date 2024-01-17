const passport = require('passport')
const jwt = require('passport-jwt')

// const { usersModel } = require('../models/users.model')
const UserDaoMongo = require('../daos/Mongo/userDao.mongo.js')
const { createHash, isValidPassword } = require('../utils/hashPassword.js')

const JWTStrategy = jwt.Strategy
const ExtractJWT  = jwt.ExtractJwt
const userService   = new UserDaoMongo() 

exports.initializePassport = () => {
    const cookieExtractor = req => {
        let token = null
        if (req && req.cookies) {
            token = req.cookies['token']
        }
        return token

    }
    // una estrategia es un middleware

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'CoderSecretoJesonWebToken'
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }))



    
}