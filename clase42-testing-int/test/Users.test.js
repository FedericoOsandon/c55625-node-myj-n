import mongoose  from "mongoose"
import Users from "../src/dao/Users.dao.js"
import Assert from 'node:assert'

mongoose.connect('mongodb://127.0.0.1:27017/c70405test')

const assert = Assert.strict

describe('Testing User Dao', function() {
    before(function(){
        this.userDao = new Users()
    })
    beforeEach(function () {
        mongoose.connection.collections.users.drop()
        this.timeout(5000)

    })
    it('El debe poder obtener los usuarios en formato arreglo', async function () {
        const result = await this.userDao.get()
        assert.strictEqual(Array.isArray(result), true)
    })   
    it('El dao debe agregar un ususario correctamente a la base de datos', async function() {
        let mockUser = {
            first_name: 'Federico',
            last_name: 'Osandón',
            email: 'f@gmail.com',
            password: '123456'
        }

        const result= await this.userDao.save(mockUser)

        assert.ok(result._id)
    })
    it('El dao agregará al documento insertado un arreglo de mascotas vacío por defecto', async function () {
        let mockUser = {
            first_name: 'Federico',
            last_name: 'Osandón',
            email: 'f@gmail.com',
            password: '123456'
        }

        const result= await this.userDao.save(mockUser)
        assert.deepStrictEqual(result.pets, [])
    })
    it('El dao puede obtener a un usuario por email', async function () {
        let mockUser = {
            first_name: 'Federico',
            last_name: 'Osandón',
            email: 'f@gmail.com',
            password: '123456'
        }

        const result= await this.userDao.save(mockUser)
       

        const user = await this.userDao.getBy({email: result.email})
        assert.strictEqual(typeof user, 'object')
        
    })
    
})
