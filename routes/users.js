var express = require('express');
const { findOne } = require('../models/users');
var router = express.Router();

const User = require('../models/users');
const { checkBody } =require('../modules/checkBody')
//const fetch = require('node-fetch');

//inscription
router.post("/signup", (req, res)=>{
    //si un des champs est manquant
   // if (!req.body.name || !req.body.email || !req.body.password ){ avant d'integrer la fonction checkbody
    if (!checkBody(req.body, ["name", "email", "password"])){
        res.json({result:false, error: "Missing or empty fields"});
        return;
    }
    //si les champs sont remplis mais l'email est deja attribué a un autre user
    User.findOne({email:req.body.email}).then(data=> {
        if (data===null){
            const newUser =new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            newUser.save().then(()=>{
            res.json({result: true})
        });
        }else{
            res.json({result:false, error: "users already exists"})
        }
    })
});






//connection
router.post("/signin", (req,res)=>{
    //verifier si on a rempli le champ emmail et password pour se connecter
    if(!req.body.email || !req.body.password){
        res.json({result: false, error:"Missing or empty fields"})
    }
    //vérifier si le mail et mot de passe exist déja 
    User.findOne({email: req.body.email, password: req.body.password}).then(data=>{
        if (data) {
            res.json({result:true})
        }else{
            res.json({result:false, error:"user not found"})
        }
    }
    )
})


module.exports = router;