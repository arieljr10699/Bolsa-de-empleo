const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");

const category = require ("../../models/Category");


//Ruta GET Jobs
router.get("/", auth, (req, res) => {
    category.find()
        .then(categories => res.json(categories))
});

//Ruta POST Jobs
router.post("/", auth, (req, res) => {

    const newCategory = new Category({
        tipo: req.body.tipo
    });
    
    //Revisar para duplicados
    category.find({tipo: newCategory.tipo}, (err,docs) =>{
        if(err) throw err;

        //De no encontrar duplicados proceder a guardar
        if(docs == 0) newCategory.save().then(category => res.json(category));

        //De encontrarlo proceder a reportarlo y no agregarlo.
        else return res.json("Categoria duplicada")
    });

});


//Ruta DELETE Categories
//Se envia la categoria en su forma string como parametro para la eliminacion
router.delete("/:tipo", auth, (req, res) => {

    category.find({tipo: req.params.tipo})
        .remove(() => res.json("Categoria eliminada"))
        .catch(err => res.status(404).json("Categoria no Eliminada"))

    
});


//Ruta PUT Categories
//Se envia la categoria en su forma string como parametro para la eliminacion
router.put("/:tipo", auth, (req, res) => {

    //Buscar al primer documento category que coincida con el campo tipo y actualizar
    category.findOneAndUpdate({"tipo": req.params.tipo }, { tipo: req.body.tipo }, (err, doc) => {
        if (err) return res.send(500, {error: err});

        doc.tipo = req.body.tipo;
        return res.send(doc);
        });
    
});


module.exports = router;