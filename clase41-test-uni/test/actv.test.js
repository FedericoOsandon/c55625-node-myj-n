import chai from 'chai'
import mongoose from 'mongoose'
import UserDTO from '../src/dto/User.dto.js'
import {createHash, passwordValidation } from '../src/utils/index.js'

const expect = chai.expect
mongoose.connect('mongodb://127.0.0.1:27017/c70405test')

describe('testing de bcrypt', () => {
    it('La función debe devolver un hash efectivo, del password', async () => {
        const password     = '123456'
        const passwordHash = await createHash(password)
        
        expect(passwordHash).to.not.equal(password)
    })
    it('La función passwordValidation debe poder comparar efectivamente el password con el hash', async () => {
        const password          = '123456'
        const passwordHash      = await createHash(password)
        const isValdatePassword = await passwordValidation({password: passwordHash}, password)
        
        expect(isValdatePassword).to.be.true
        
    })
    it('La función passwordValidation debe poder comparar efectivamente el password con el hash', async () => {
        const password          = '123456'
        const passwordHash      = await createHash(password)
        const passwordHashAlte  = passwordHash + 'e'
        
        const isValdatePassword = await passwordValidation({password: passwordHashAlte}, password)
        expect(isValdatePassword).to.be.false
    })  
})


describe('Testing User dto', function() {
    before(function(){
        this.userDto = UserDTO.getUserTokenFrom
    })
    beforeEach(function () {
        // mongoose.connection.collections.users.drop()
        this.timeout(5000)
    })

    it('El dto debe devolver un user con campos de nombre y apellido unificados a name', async () => {
        let mockUser = {
            first_name: 'Federico',
            last_name: 'Osandón',
            email: 'f@gmail.com',
            password: '123456'
        }

        const userDtoResult = await UserDTO.getUserTokenFrom(mockUser)
        expect(userDtoResult).to.have.property('name')
        expect(userDtoResult).to.have.property('name', `${mockUser.first_name} ${mockUser.last_name}`)
    })

    it('El dto debe devolver un user sin los campos innecesarios', async () => {
        let mockUser = {
            first_name: 'Federico',
            last_name: 'Osandón',
            email: 'f@gmail.com',
            password: '123456'
        }
        const userDtoResult = await UserDTO.getUserTokenFrom(mockUser)

        expect(userDtoResult).to.not.have.property('first_name')
        expect(userDtoResult).to.not.have.property('last_name')
        expect(userDtoResult).to.not.have.property('password')
    })
})