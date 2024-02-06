// const {Router} = require('express')
const Router  = require("./rutes")
const jwt = require('jsonwebtoken')

class UserRouter extends Router {
    init(){
        // router.get
        this.get('/', (req,res)=>{
            // if(false) return res.sendUserError('no esta usuario')
            res.sendSuccess('Bienvenidos a la clase padre UserRouter')
        })

        this.post('/login', ["PUBLIC"], (req, res)=>{
            let user = {
                email: req.body.email,
                role: 'user'
            }
            let token = jwt.sign(user, 'CoderSecretClassRouter')
            res.sendSuccess({token})
        })

        this.get('/current', ["USER","USER_PREMIUN"],(req,res)=>{
            // if(false) return res.sendUserError('no esta usuario')
            res.sendSuccess(req.user)
        })
    }
}

module.exports = UserRouter


class ProductRouter extends Router{}
class AuthRouter extends Router{}
class CartRouter extends Router{}
class OredenRouter extends Router{}




// router.get('/', (req, res) => {
//     res.send(req.params.word)
// })


// router.get('*', async (req, res)=>{
//     res.status(404).send('no se encuentra ninguna ruta')
// })

// module.exports = router