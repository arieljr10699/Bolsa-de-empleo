const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

const config = require ("../../models/Config");


//Ruta GET Config
router.get("/", auth, (req, res) => {
    config.find()
        .then(configs => res.json(configs))
});

//Ruta POST Config
router.post("/", auth, (req, res) => {

    const newConfig = new Config({
        amount: req.body.amount
    });
    newConfig.save().then(config => res.json(config));


});


//Ruta DELETE Configs
//Se envia la categoria en su forma string como parametro para la eliminacion
router.delete("/:id", auth, (req, res) => {

    config.findById(req.params.id)
        .then(config => config.remove().then(() => res.json("Config eliminado")))
        .catch(err => res.status(404).json("Config no Eliminado"))
});



//Ruta PUT Configs
//Se envia el id del configs para ser editado
router.put("/:id", auth, (req, res) => {

    //Buscar al primer documento category que coincida con el campo tipo y actualizar
    category.findOneAndUpdate({"id": req.params.id }, { amount: req.body.amount }, (err, doc) => {
        if (err) return res.send(500, {error: err});

        doc.amount = req.body.amount;
        return res.send(doc);
        });
    
});



module.exports = router;