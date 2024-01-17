exports.authorizationJwt = role => {
    return async (req, res, next) => {
        // console(req.use)
        if(!req.user) return res.status(401).send({error: 'Unauthorized'})
        if(req.user.role !== role) return res.status(401).send({error: 'Not permissions'})
        next()
    }
}