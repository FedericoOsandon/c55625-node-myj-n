function authentication(req, res, next) {
    // pedir el user a la base de datos 
    if(req.session.username !== 'fede' || !req.session.admin ) {
        return res.status(401).send('error de autenticación')
    } 
    next()

}

module.exports = {
    authentication
}