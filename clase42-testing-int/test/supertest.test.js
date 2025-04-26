import chai from 'chai';
import supertest from 'supertest'

const expect    = chai.expect;
const requester = supertest('http://localhost:8080')


describe('Testing de adoptame mascotas', () => { 
    // describe('Test de mascotas', ()=>{
    //     it('El endpoint POST /api/pets debe crear una mascota correctamente', async ()=>{
    //         const petMock =  {
    //             name: 'Patitas',
    //             specie: 'Pez',
    //             birthDate: '10-10-2022'
    //         }

    //         const { ok, statusCode, _body } = await requester.post('/api/pets').send(petMock)
    //         // console.log(ok)
    //         // console.log(_body)
    //         // console.log(statusCode)

    //         expect(_body.payload).to.have.property('_id')
    //     })
    //     it('El endpoint POST /api/pets debe devolver un status 400 al intentar crear una mascota sin el campo nombre', async () => {
    //         const petMock =  {
    //             // name: 'Patitas',
    //             specie: 'Pez',
    //             birthDate: '10-10-2022'
    //         }
    //         const { ok, statusCode, _body } = await requester.post('/api/pets').send(petMock)

    //         expect(statusCode).to.equal(400)

    //     })

    //     it('El enpoint GET /api/pets/:pid debe devolver una mascota por un pid pasado por url', async () => {
    //         const petMock =  {
    //             name: 'Patitas',
    //             specie: 'Pez',
    //             birthDate: '10-10-2022'
    //         }
    //         const { ok, statusCode, _body } = await requester.post('/api/pets').send(petMock)
    //         expect(_body.payload).to.have.property('_id')

    //         const result = await requester.get(`/api/pets/${_body.payload._id}`)
    //         console.log(result)

    //         expect(result.ok).to.be.equal(true)
    //         expect(statusCode).to.be.equal(200)

    //     })
        
    // })

    // describe('Testing avanzado de session', () => {
    //     let cookie = {}
    //     // it('El post /api/sessions/register debe registrar un usuario correctamente y devolver el id', async () => {
    //     //     const userMock = {
    //     //         first_name: 'Fede',
    //     //         last_name: 'Fede',
    //     //         email: 'fedemcok.2@gmail.com',
    //     //         password: '123456'
    //     //     }

    //     //     const result = await requester.post('/api/sessions/register').send(userMock)
    //     //     console.log(result._body.payload)
    //     //     expect(result._body.payload).to.be.ok

    //     // })
    //     it('El endpoint POST /api/sessions/login debe loguear correctamente un usuario y devolver una cookie', async () => {
    //         // crear el usurio 
    //         const userMock = {
    //             email: 'fedemcok.1@gmail.com',
    //             password: '123456'
    //         }
    //         const {ok, statusCode, _body, headers } = await requester.post('/api/sessions/login').send(userMock)

    //         // console.log(headers)
    //         const cookieResult = headers['set-cookie'][0]
    //         expect(cookieResult).to.be.ok
    //         // 'coderCookie=asñdlfalsdjflasfdalsdfas'
    //         cookie = {
    //             name: cookieResult.split('=')[0],
    //             value: cookieResult.split('=')[1]
    //         }

    //         expect(cookie.name).to.be.ok.and.eql('coderCookie')
    //         expect(cookie.value).to.be.ok
    //     })
    //     it('el endpoint GET /api/current debe recibir la cookie que contiene al usuario, y desencriptar la info correctamente', async () => {
    //         const { _body } = await requester.get('/api/sessions/current').set('Cookie', [`${cookie.name}=${cookie.value}`])

    //         expect(_body.payload).to.have.property('email', 'fedemcok.1@gmail.com')
    //     })
    // })

    describe('TEst de uploader', () => {
        it('Debe crearse una mascota con imagen', async () => {
            const petMock =  {
                name: 'Aletitas',
                specie: 'Perro',
                birthDate: '10-10-2022'
            } 

            const result = await requester.post('/api/pets/withimage')
                                                .field('name', petMock.name)
                                                .field('specie', petMock.specie)
                                                .field('birthDate', petMock.birthDate)
                                                .attach('image', './test/aletitas.jpg')

            expect(result.status).to.be.eql(200)
            expect(result._body.payload).to.have.property('_id')
            expect(result._body.payload.image).to.be.ok

        })
    })

 })