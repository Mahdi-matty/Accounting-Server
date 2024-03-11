const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {User, Product} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection')

router.get('/', (req, res)=>{
    User.findAll().then(allUser=>{
        res.json(allUser)
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg:'internal server error', err})
    })
})

router.get('/:id', (req,res)=>{
    User.findByPk(req.params.id).then(User=>{
        if(!User){
            res.status(404).json({msg:'user not found'})
        }else{
            res.json(User)
        }
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.post("/",(req,res)=>{
    User.create({
        username:req.body.username,
        password:req.body.password,
        email: req.body.email,
    }).then(newUser=>{
        const token = jwt.sign({
            email:newUser.email,
            id:newUser.id,
            username: newUser.username
        },process.env.JWT_SECRET,{
            expiresIn:"2h"
        })
        res.json({
            token,
            user:newUser
        })
        res.json(newUser)

     }).catch(err=>{
        console.log(err)
        res.status(500).json({msg:"oh no!",err})
    })
})

router.put('/:id', withTokenAuth, (req, res)=>{
    User.update({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    },{
        where: {
            id: req.tokenData.id
        }
    }).then((editeduser)=>{
        if(!editeduser[0]){
            res.status(404).json({msg: 'user not found'})
        }else{
            res.json(editeduser[0])
        }
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.delete('/:id', (req, res)=>{
    User.destroy({
        username:req.body.username,
        password:req.body.password,
        email: req.body.email,
    },{
        where: {
            id: req.params.id
        }
    }).then((deleteeduser)=>{
        if(!deleteeduser){
            res.status(404).json({msg: 'user not found'})
        }else {
            res.json(deleteeduser)
        }
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.post('/login', (req,res)=>{
    User.findOne({
        where: {
            username:req.body.username
        }
    }).then((foundUser)=>{
        if(!foundUser || !bcrypt.compareSync(req.body.password,foundUser.password)){
            return res.status(401).json({msg:"invalid login credentials"})
        };
        const token = jwt.sign({
            email:foundUser.email,
            id:foundUser.id,
            username: foundUser.username
        },process.env.JWT_SECRET,{
            expiresIn:"2h"
        })
        res.json({
            token,
            client:foundUser
        })
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.get("/logged-user", withTokenAuth, (req, res) => {
    User.findByPk(req.tokenData.id).then(dbStudent => {
        if (!dbStudent) {
            res.status(404).json({ msg: "user not found!!!!" })
        } else {
            res.json(dbStudent)
        }
    }).catch(err => {
        res.status(500).json({ msg: "oh no!", err })
    })
});

router.get('/logOut', (req,res)=>{
          res.json({ msg: 'Logout successful' });
        });
  

module.exports= router