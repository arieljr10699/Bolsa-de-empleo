const express = require("express");
const mongoose = require("mongoose");
const formidable = require("formidable");
const fs = require("fs");
const jwtAuth = require("../../middlewares/jwtAuth");
const adminAuth = require("../../middlewares/adminAuth");

const router = express.Router();

const job = require ("../../models/Job");
const category = require ("../../models/Category");


//Ruta GET Jobs
//Retorna un JSON con todos los documentos Jobs
router.get("/", jwtAuth, (req, res) => {
    job.find()
        .populate("category", "tipo")
        .sort({date: -1})
        .then(jobs => res.json(jobs))
});

//Ruta GET /jobs/:category
//Retorna los Jobs con la misma categoria
router.get("/category/:category", jwtAuth, (req, res) => {

    //Buscar todas las categorias disponibles
    category.find({}, (err,categories) => {

        const catDetails = categories.find(category => {
            return category.tipo == req.params.category;

        });

        //De no encontrar la categoria en base de dato enviar respuesta de invalido
        if(typeof catDetails == "undefined") res.send("Categoria no encontrada"); 
        else
        {
            job.find({category: catDetails._id})
            .populate("category", "tipo")
            .sort({date: -1})
            .then(jobs => res.json(jobs));
        }
        
    });
    
});


//Ruta GET /jobs/:id
//Retorna el Job que coincida con el parametro id
router.get("/:id", jwtAuth, (req, res) => {

    job.findById(req.params.id)
        .populate("category", "tipo")
        .then(job => res.json(job));
    
});

//Ruta POST Jobs
//enctype = "multipart/form-data"
router.post("/", jwtAuth, (req, res) => {


    const form = formidable({ keepExtensions: true });

   

    //Peticiones a esta ruta deben estar encoded como multipart/form-data
    form.parse(req, (err, fields, files) => {

        if (err) return res.send(err);

        const {company, type, url, position, location, description, compemail} = fields;

        if(!company || !type || !position || !location) return res.send("Complete los campos requeridos");

        const file = files.logo;
        
        if(file !== undefined){
        
            //Mover el archivo  al path public/logos
            fs.rename(file.path, "public/logos/" + file.name, function (err) {
                if (err) return res.send(err);
                console.log('Path cambiado');
            });
            }
        

        //Buscar categorias
        category.find({}, (err,categories) => {

            //Obtener detalles de categoria a la que pertenece el job
            const catDetails = categories.find(category => {
                return category.tipo == fields.category;

            });

            //De no encontrar la categoria enviar respuesta
            if(typeof catDetails == "undefined") return res.send("Categoria no encontrada"); 

            const newJob = new Job({
                company,
                type,
                url,
                position,
                location,
                description,
                logo: file.name,
                compemail,
                category: mongoose.Types.ObjectId(catDetails._id)
            });

            newJob.save().then(job => res.json(job)).catch( err => res.send(err));
            
    });

});
    
});

//Ruta DELETE Jobs
//Se envia el id del Job para buscar en BD y eliminar.
router.delete("/:id", [jwtAuth, adminAuth], (req, res) => {

    job.findById(req.params.id)
        .then(job => job.remove().then(() => res.json("Job eliminado")))
        .catch(err => res.status(404).json("Job no Eliminado"))
});

//Ruta PUT Jobs
//enctype = "multipart/form-data"
router.put('/:id', [jwtAuth, adminAuth],  (req, res) => {

    const form = formidable({ keepExtensions: true });

    //Peticiones a esta ruta deben estar encoded como multipart/form-data
    form.parse(req, (err, fields, files) => {

        if (err)  return res.send(err);

        const {company, type, url, position, location, description, compemail} = fields;

        const file = files.logo;

        if(!company || !type || !position || !location) return res.send("Complete los campos requeridos");

        //Buscar categorias
        category.find({}, (err,categories) => {

            //Obtener detalles de categoria a la que pertenece el job
            const catDetails = categories.find(category => {
                return category.tipo == fields.category;

            });

            if(file !== undefined){
        
                //Mover el archivo  al path public/logos
                fs.rename(file.path, "public/logos/" + file.name, function (err) {
                    if (err) res.send(err);
                    console.log('Imagen modificada con exito');
                });
            
        
                //Buscar al primer documento job que coincida con el id y actualizar
                job.findOneAndUpdate({"_id": req.params.id }, 
                                    {
                                        company,
                                        type,
                                        url,
                                        position,
                                        location,
                                        description,
                                        logo: file.name,
                                        compemail,
                                        category: mongoose.Types.ObjectId(catDetails._id)
                                    },function(err, doc) {
                if (err) return res.send(500, {error: err});

                return res.send(doc);
                });
            }
    });
    });
});


module.exports = router;