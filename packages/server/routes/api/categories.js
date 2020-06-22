const express = require("express");
const router = express.Router();

const category = require ("../../models/Category");



//Ruta GET Jobs
router.get("/", (req, res) => {
    category.find()
        .then(categories => res.json(categories))
});

//Ruta POST Jobs
router.post("/", (req, res) => {


    const newCategory = new Category({
        tipo: req.body.tipo
    });
    
    //Revisar por duplicados
    category.find({tipo: newCategory.tipo}, (err,docs) =>{
        if(err) throw err;

        //De no encontrar duplicados proceder a guardar
        if(docs == 0) newCategory.save().then(category => res.json(category));
    });

    
    res.send("Listo");
});


//Ruta DELETE Jobs
router.delete("/:tipo", (req, res) => {

    category.find({tipo: req.params.tipo})
        .remove(() => res.json("Categoria eliminada"))
        .catch(err => res.status(404).json("Categoria no Eliminada"))

    
});


module.exports = router;