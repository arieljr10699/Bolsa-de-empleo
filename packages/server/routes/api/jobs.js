const express = require("express");
const mongoose = require("mongoose");
const formidable = require("formidable");
const fs = require("fs");
const auth = require("../../middlewares/auth");

const router = express.Router();

const job = require ("../../models/Job");
const category = require ("../../models/Category");


//Ruta GET Jobs
//Retorna un JSON con todos los documentos Jobs
router.get("/", auth, (req, res) => {
    job.find()
        .populate("category", "tipo")
        .sort({date: -1})
        .then(jobs => res.json(jobs))
});

//Ruta GET Jobs
router.get("/:category", auth, (req, res) => {

    category.find({}, (err,categories) => {


        const catDetails = categories.find(category => {
            return category.tipo == req.params.category;

        });

        //De no encontrar la categoria enviar respuesta
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

//Ruta POST Jobs
//enctype = "multipart/form-data"
router.post("/", auth, (req, res) => {


    const form = formidable({ keepExtensions: true });


    //Peticiones a esta ruta deben estar encoded como multipart/form-data
    form.parse(req, (err, fields, files) => {

        if (err) throw err;

        
        const file = files.logo;
        
        //Mover el archivo  al path public/logos
        fs.rename(file.path, "public/logos/" + file.name, function (err) {
            if (err) throw err;
            console.log("Archivo agregado");
          });

          
        const {company, type, url, position, location, description, email} = fields;

        //Buscar categorias
        category.find({}, (err,categories) => {

            //Obtener detalles de categoria a la que pertenece el job
            const catDetails = categories.find(category => {
                return category.tipo == fields.category;

            });

            //De no encontrar la categoria enviar respuesta
            if(typeof catDetails == "undefined") res.send("Categoria no encontrada"); 
            else
            {

                const newJob = new Job({
                    company,
                    type,
                    url,
                    position,
                    location,
                    description,
                    logo: file.name,
                    email,
                    category: mongoose.Types.ObjectId(catDetails._id)
                });

                newJob.save().then(job => res.json(job));
            }
    });

});
    
});

//Ruta DELETE Jobs
//Se envia el id del Job para buscar en BD y eliminar.
router.delete("/:id", auth, (req, res) => {

    job.findById(req.params.id)
        .then(job => job.remove().then(() => res.json("Job eliminado")))
        .catch(err => res.status(404).json("Job no Eliminado"))
});

//Ruta PUT Jobs
//enctype = "multipart/form-data"
router.put('/:id', auth, (req, res) => {

    const form = formidable({ keepExtensions: true });

    //Peticiones a esta ruta deben estar encoded como multipart/form-data
    form.parse(req, (err, fields, files) => {

        if (err) throw err;

        //Buscar categorias
        category.find({}, (err,categories) => {

            //Obtener detalles de categoria a la que pertenece el job
            const catDetails = categories.find(category => {
                return category.tipo == fields.category;

            });

            const {company, type, url, position, location, description, email} = fields;

            const file = files.logo;
        
            //Mover el archivo  al path public/logos
            fs.rename(file.path, "public/logos/" + file.name, function (err) {
                if (err) throw err;
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
                                    email

                                },function(err, doc) {
            if (err) return res.send(500, {error: err});

            return res.send(doc);
        });
    });
    });
});


module.exports = router;