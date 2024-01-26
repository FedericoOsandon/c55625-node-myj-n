const { Router } = require('express')
const { fork } = require('node:child_process')

const router = Router()

function operacionCompleja(){
    let result = 0
    for (let i = 0; i < 7e9; i++) {
        result += i        
    }
    return result
}

router.get('/block', (req, res) => {
    const result = operacionCompleja()
    res.send(`El resultado es: ${result}`)
})


router.get('/noblock', (req, res) => {
   const child = fork('./src/routes/apis/operacioncompleja.js')
   child.send('inicia el cálculo plis')
   child.on('message', data => {
       res.send(`El resultado es: ${data}`)
   }) 
    
})

// expresiones regulares utf-8 á -> %C3%A1 é -> %C3%A9 
// router.param('palabra', async (req, res, next, palabra) =>{
//     console.log(palabra)
//     let palabraFound = ['fede', 'juan', 'lucas'].includes(palabra)
//     console.log(palabraFound)
//     if (!palabraFound) {
//         req.word = 'no se encuentra'
        
//     }else{
//         req.word = 'se encuentra'
//     }
//     next()

// })

// router.get('/:palabra([a-zA-Z%C3%A1%C3%A9%C3%BC]+)', (request, response)=>{
//      console.log(request.params)
//     response.send(request.word)
// })

module.exports = router