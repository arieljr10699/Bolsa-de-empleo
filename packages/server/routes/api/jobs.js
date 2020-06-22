const express = require("express");
const router = express.Router();

const job = require ("../../models/Job");

//Ruta GET Jobs
router.get("/", (req, res) => {
    job.find()
        .sort({date: -1})
        .then(jobs => res.json(jobs))
});

//Ruta POST Jobs
router.post("/", (req, res) => {
    const newJob = new Job({
        company: req.body.company
    });

    newJob.save().then(job => res.json(job));
});


//Ruta DELETE Jobs
router.delete("/:id", (req, res) => {

    job.findById(req.params.id)
        .then(job => job.remove().then(() => res.json("Job eliminado")))
        .catch(err => res.status(404).json("Job no Eliminado"))
});


module.exports = router;