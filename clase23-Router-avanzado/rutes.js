const { Router } = require('express')
const jwt = require('jsonwebtoken')

class ClassRouter {
    constructor(){
        this.router = Router() //let router = Router
        this.init()
    }

    getRouter(){
        return this.router
    }

    init(){}

    // let saludo(...param){} // param ['fede', 'juan']
    // saludo('fede', 'juan')


    // (req,res,next,etc)
    applyCallbacks(callbacks){ // params req, res, next, etc
        return callbacks.map(callback => async (...params)=>{
            try {
                await callback.apply(this, params)
            } catch (error) {
                console.log(error)
                params[1].status(500).send(error)
            }
        })
    }

    generateCustomResponses(req,res,next){
        res.sendSuccess = payload => res.send({status: 'success', payload})
        res.sendServerError = error => res.send({status: 'error', error})
        res.sendUserError = error => res.send({status: 'error', error})
        next()
    }

    handlePolicies = policies =>  (req, res, next) =>{
        if(policies[0]=== 'PUBLIC') return next() 
        const authHeaders = req.headers.authorization
        if (!authHeaders) return res.status(401).send({status: 'error', error: 'Unauthorized'})
        const token  = authHeaders.split(' ')[1] // beare tasdfhashdkfa 
        let user = jwt.verify(token, 'CoderSecretClassRouter')
        if(!policies.includes(user.role.toUpperCase())) return res.status(401).send({status: 'error', error: 'No permissions'})
        req.user =user 
        next()
    }

    // router.get('/', ()=>)
    get(path, policies,...callbacks){
        // router.get
        this.router.get(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

    post(path, policies,...callbacks){
        // router.post
        this.router.post(path, this.handlePolicies(policies), this.generateCustomResponses,this.applyCallbacks(callbacks))
    }

    put(path, policies,...callbacks){
        // router.put
        this.router.put(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

    delete(path, policies,...callbacks){
        // router.delete
        this.router.delete(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacks))
    }

}


module.exports = ClassRouter

