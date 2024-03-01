const { Router } = require('express')
const { faker } = require('@faker-js/faker')
const compression = require('express-compression')

const router = Router()



router.get('/test/user', (req, res) => {
    let first_name = faker.person.firstName()
    let last_name  = faker.person.lastName()
    let email      = faker.internet.email()
    let password   = faker.internet.password()
    res.send({
        first_name,
        last_name, 
        email,
        password
    })
})



// http://localhost:8080/pruebas/compleja

// artillery quick --count 40 --num 50 "http://localhost:8080/pruebas/simple" -o simple.json
// artillery quick --count 40 --num 50 "http://localhost:8080/pruebas/compleja" -o compleja.json

// artillery run config.yaml --output testPerformance.json

// artillery report testPerformance.json -o testResults.html
router.get('/simple', (req, res) => {
    let sum = 0
    for (let i = 0; i < 1000000; i++) {
        sum += i        
    }
    res.send(`La suma es ${sum}`)
})


router.get('/compleja', (req, res) => {
    let sum = 0
    for (let i = 0; i < 5e8; i++) {
        sum += i        
    }
    res.send(`La suma es ${sum}`)
})


router.get('/logger',(req, res) => {
    req.logger.warning('alerta esto es un warning en el endpint de pruebas/logger');
    // req.logger.error('alerta esto es un error en el endpint de pruebas/logger');
    // req.logger.fatal('alerta esto es un error en el endpint de pruebas/logger');
    res.send('logger')
})


// router.use(compression({
//     brotli: {
//         enabled: true,
//         zlib: {}
//     }
// }))
// router.get('/compress', (req, res) => {
//     let string = 'Hola coders, soy un string ridiculamente largo'

//     for (let i = 0; i < 5e4; i++) {
//         string += 'Hola coders, soy un string ridiculamente largo'        
//     }

//     res.send(string)
// })



module.exports = router