const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const user = require ("../../models/User");


//Ruta GET Users
router.get("/", (req, res) => {
    user.find()
        .sort({date: -1})
        .then(users => res.json(users))
});

//Ruta POST Users
//Registro de usuarios
router.post("/", (req, res, next) => {

    const { email, password, username, rol } = req.body;

    //Validacion de datos disponibles
    if( !email || !password || !username){
        return res.status(400).json({ msg: "Rellene todos los valores"})
    }

    //Validacion de Email debe ser campo unico
    user.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({msg: "Usuario ya existe"})
        })

    const newUser = new User({
        username,
        email,
        password,
        rol
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err,hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save().then(user =>
                
                jwt.sign(
                    { id: user.id, rol: user.rol },
                    process.env.JWT_SECRET,
                    { expiresIn: 3600},
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                username: user.username,
                                email: user.email,
                                rol: user.rol
                        }
                    })
                    }
                )
                ).catch( err => res.send(err));;
        })
    })
    
});



module.exports = router;