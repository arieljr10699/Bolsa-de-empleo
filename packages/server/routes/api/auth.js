const express = require("express");
const user_controller = require("../controllers/userControl");
const jwtAuth = require("../../middlewares/jwtAuth");

const router = express.Router();

//Ruta POST Users/auth
//Acceso de usuarios
//publica
router.post("/auth", (req, res) => {

    user_controller.login(req,res);
    
});


//Ruta GET auth/user
// Obtener informacion del usuario.
//Privada
router.get("/auth/user", jwtAuth, (req, res) => {
    user_controller.getInfo(req,res);
});


module.exports = router;