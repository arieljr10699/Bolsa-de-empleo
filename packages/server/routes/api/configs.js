const express = require("express");
const jwtAuth = require("../../middlewares/jwtAuth");
const adminAuth = require("../../middlewares/adminAuth");
const config_controller = require("../controllers/configControl");
const router = express.Router();

//Ruta GET Config
router.get("/", [jwtAuth, adminAuth], (req, res) => {
    config_controller.findConfigs(req,res);
});

//Ruta POST Config
router.post("/", [jwtAuth, adminAuth], (req, res) => {
    config_controller.postConfig(req,res);
});

//Ruta DELETE Configs
//Se envia la categoria en su forma string como parametro para la eliminacion
router.delete("/:id", [jwtAuth, adminAuth], (req, res) => {
    config_controller.deleteConfig(req,res,req.params.id);  
});

//Ruta PUT Configs
//Se envia el id del configs para ser editado
router.put("/:id", [jwtAuth, adminAuth], (req, res) => {
    config_controller.editConfig(req,res,req.params.id);  
});



module.exports = router;