const { Router } = require('express')

const router = Router()

const dictionarySercvie = [ // simulando busqueda
    {word: 'hola', lenguage: 'español'},
    {word: 'hello', lenguage: 'ingles'},
    {word: 'hola', lenguage: 'ingles'},
]

router.param('word', async (req, res,next, word) => {
    let searchWord = await dictionarySercvie.find(palabra => palabra.word === word)

    if (!searchWord) {
        req.word=null
    } else {
        req.word = searchWord.word
    }
    next()
})

//byte utf-8  a´= %C3%A1    é = %C3%A9
router.get('/:word([a-z]+)', (req, res) => {
    res.send(req.params.word)
})

// router.get('/:word([a-z%C3%A1%C3%A9%C3%AD]+)', (req, res) => {
//     res.send(req.params.word)
// })

// router.get('/:word([A-Z%C3%81%C3%89%C3%8D%C3%93%C3%9A%C3%9C]+)/:lenguage([a-z])', getSearcWord)
// router.put('/:word([A-Z%C3%81%C3%89%C3%8D%C3%93%C3%9A%C3%9C]+))', getSearcWord)
// router.delete('/:word([A-Z%C3%81%C3%89%C3%8D%C3%93%C3%9A%C3%9C]+))', getSearcWord)


router.get('*', async (req, res)=>{
    res.status(404).send('no se encuentra ninguna ruta')
})

module.exports = router