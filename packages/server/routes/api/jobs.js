const express = require("express");
const jwtAuth = require("../../middlewares/jwtAuth");
const adminAuth = require("../../middlewares/adminAuth");
const job_controller = require("../controllers/jobsControl");
const router = express.Router();




//Ruta GET Jobs
//Retorna un JSON con todos los documentos Jobs
router.get("/", jwtAuth, (req, res) => {
    job_controller.findJobs(req, res);
});

//Ruta GET /jobs/:category
//Retorna los Jobs con la misma categoria
router.get("/category/:category", jwtAuth, (req, res) => {

    job_controller.findCategoryJobs(req, res, req.params.category);
    
});


//Ruta GET /jobs/:id
//Retorna el Job que coincida con el parametro id
router.get("/:id", jwtAuth, (req, res) => {
    job_controller.findIdJob(req, res, req.params.id);
    
});

//Ruta GET /api/jobs/search/:param
//Busca en diferentes campos en los difernetes documentos jobs y los retorna.
//Los campos de busqueda son location, type y position
router.get("/search/:key", jwtAuth, (req, res) => {
    job_controller.searchJob(req,res,req.params.key);
    
})

//Ruta GET jobs/logos/
//Ruta servidora de imagenes y/o logos.
router.get("/logos/:name", (req, res) => {

    res.sendFile(req.params.name, { root: "public/logos/" });
});

//Ruta POST Jobs
//enctype = "multipart/form-data"
router.post("/", jwtAuth, (req, res) => {
    job_controller.postJobs(req,res);    
});

//Ruta DELETE Jobs
//Se envia el id del Job para buscar en BD y eliminar.
router.delete("/:id", [jwtAuth, adminAuth], (req, res) => {

    job_controller.deleteJob(req, res, req.params.id);
});

//Ruta PUT Jobs
//enctype = "multipart/form-data"
router.put('/:id', [jwtAuth, adminAuth],  (req, res) => {

    job_controller.editJob(req, res, req.params.id);
});


module.exports = router;