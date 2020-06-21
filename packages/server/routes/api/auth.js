const express = require("express");
const router = express.Router();

const user = require ("../../models/User");

//Ruta GET Users
router.get("/", (req, res) => {
    user.find()
        .sort({date: -1})
        .then(users => res.json(users))
});

//Ruta POST Users
router.post("/", (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save().then(user => res.json(user),
                        err => {
                            console.log(String(err));
                            res.send("No se pudo guardar usuario");
                            } 
                        );
});

module.exports = router;