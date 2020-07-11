
const config = require ("../../models/Config");

exports.findConfigs = function(req, res) {

    //Buscar todas los configs y retornarlos
    config.find()
        .then(configs => res.json(configs))
};

exports.postConfig = function(req, res) {

    const { amount } = req.body;

    if( !amount ) return res.send("Faltan datos");

    //Guardar nuevo documento config
    const newConfig = new Config({
        amount: req.body.amount
    });
    newConfig.save().then(config => res.json(config)).catch( err => res.send(err));;
};

exports.deleteConfig = function(req, res, id) {
 
    //Buscar config por id y eliminar
    config.findById(id)
        .then(config => config.deleteOne().then(() => res.json("Config eliminado")))
        .catch(err => res.status(404).json("Config no Eliminado"))
};


exports.editConfig = function(req, res, id) {

    const { amount } = req.body;

    if(!amount) res.send("Falta informacion necesaria apra actualizar.");
 
    //Buscar al primer documento category que coincida con el campo tipo y actualizar
    config.findOneAndUpdate({"_id": id }, { amount }, (err, doc) => {
        if (err) return res.send(500, {error: err});

        doc.amount = amount;
        return res.send(doc);
        });
};