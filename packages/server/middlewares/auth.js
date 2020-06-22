const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
    const token = req.header("Bearer");

    //Verificar existencia del token
    if(!token){ 
        res.status(401).json("No hay token de autorizacion");
    }

    try  {
        //Comprobar autorizacion
        const decoded = jwt.verify(token, config.get(process.env.JWT_SECRET));
        //Agregar usuario al envio.
        req.user = decoded;
        next();
    } catch(e) {
        res.status(400).json("Token no valido");
    }

}