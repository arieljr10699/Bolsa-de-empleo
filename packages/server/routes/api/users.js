const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const user = require ("../../models/User");
const User = require("../../models/User");


//Ruta GET Users
router.get("/", (req, res) => {
    user.find()
        .sort({date: -1})
        .then(users => res.json(users))
});

//Ruta POST Users
//Registro de usuarios
router.post("/", (req, res) => {

    const { email, password, username } = req.body;

    //Validacion de datos disponibles
    if( !email || !password || !username){
        return res.status(400).json({ msg: "Rellene todos los valores"})
    }

    //Validacion de Email debe ser campo unico
    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({msg: "Usuario ya existe"})
        })

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err,hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save().then(user =>
                
                jwt.sign(
                    { id: user.id },
                    "thisisaSecret",
                    { expiresIn: 3600},
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            user: {
                                id: user.id,
                                username: user.username,
                                email: user.email
                        }
                    })
                    }
                )
                );
        })
    })
    
});


//Ruta POST Users/auth
//Acceso de usuarios
router.post("/auth", (req, res) => {

    const { email, password } = req.body;

    //Validacion de datos disponibles
    if( !email || !password ){
        return res.status(400).json({ msg: "Rellene todos los valores"})
    }

    //Validacion de Email debe ser campo unico
    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({msg: "Usuario no existe"})

            //Validar password
    bcrypt.compare(password, user.password)
    .then(isMatch => {
        if(!isMatch) return res.status(400).json("Contraseña incorrecta");

        jwt.sign(
            { id: user.id },
            "thisisaSecret",
            { expiresIn: 3600},
            (err, token) => {
                if(err) throw err;
                res.json({
                    user: {
                        id: user.id,
                        token: token,
                        username: user.username,
                        email: user.email
                }
            })
            }
        )
        })

    
        })
    
});


module.exports = router;