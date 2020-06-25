const user = require ("../models/User").rol;

module.exports  = function adminAuth(req, res, next) {

        if(req.user.rol == "Administrador"){
          next();
        } else {
          return res.status(403).send("Usuario no tiene permisos suficientes.");
        }
      
    
  }