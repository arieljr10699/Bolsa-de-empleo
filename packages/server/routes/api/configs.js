const express = require("express");
const router = express.Router();

const config = require ("../../models/Config");


//Ruta GET Config
router.get("/", (req, res) => {
    config.find()
        .then(configs => res.json(configs))
});

//Ruta POST Config
router.post("/", (req, res) => {

    const newConfig = new Config({
        amount: req.body.amount
    });
    newConfig.save().then(config => res.json(config));


});


//Ruta DELETE Configs
//Se envia la categoria en su forma string como parametro para la eliminacion
router.delete("/:id", (req, res) => {

    config.findById(req.params.id)
        .then(config => config.remove().then(() => res.json("Config eliminado")))
        .catch(err => res.status(404).json("Config no Eliminado"))
});


module.exports = router;