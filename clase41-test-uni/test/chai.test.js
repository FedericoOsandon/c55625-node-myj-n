import chai from 'chai'
import mongoose from 'mongoose'
import Users from '../src/dao/Users.dao.js'


const expect = chai.expect
mongoose.connect('mongodb://127.0.0.1:27017/c70405test')


describe('Testing User Dao', function() {
    before(function(){
        this.userDao = new Users()
    })
    beforeEach(function () {
        mongoose.connection.collections.users.drop()
        this.timeout(5000)
    })

    it('El dao debe poder obtener los usuarios en formato arreglo', async function() {
        const result = await this.userDao.get()
        // console.log(result)

        expect(result).to.be.deep.equal([])
        expect(result).deep.equal([])
        expect(Array.isArray(result)).to.be.ok
        expect(Array.isArray(result)).to.be.equal(true)

    })
})