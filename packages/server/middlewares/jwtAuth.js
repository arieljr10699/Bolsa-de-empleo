const jwt = require("jsonwebtoken");


module.exports  =function jwtAuth(req, res, next) {

    const authHeader = req.header("authorization");

    const token = authHeader && authHeader.split(' ')[1];

    //Verificar existencia del token
    if(!token){ 
        return res.status(401).json("No hay token de autorizacion");
    }

    try  {
        //Comprobar autorizacion
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //Agregar usuario al envio.
        req.user = decoded;
        next();
    } catch(e) {
        res.status(400).json("Token no valido");
    }

}