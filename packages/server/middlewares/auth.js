const jwt = require("jsonwebtoken");


module.exports = function auth(req, res, next) {
    const authHeader = req.header("authorization");

    const token = authHeader && authHeader.split(' ')[1];

    console.log(token);

    //Verificar existencia del token
    if(!token){ 
        res.status(401).json("No hay token de autorizacion");
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