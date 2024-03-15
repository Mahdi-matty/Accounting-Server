const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Employee} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection')
const { Op } = require('sequelize');


router.get('/', (req,res)=>{
    Employee.findAll().then(allEmployee=>{
       res.json(allEmployee)
    }).catch((err)=>{
       res.status(500).json({msg: 'internal server error', err})
    })
   })
   
router.post('/', withTokenAuth,(req,res)=>{
       Employee.create({
           username: req.body.username,
           hours: req.body.hours,
           payPerHour: req.body.payPerHour,
       }).then((newEmploy)=>{
           res.json(newEmploy)
       }).catch((err)=>{
           res.status(500).json({msg: 'internal server error', err})
       })
   });
   
router.get('/:id', (req, res)=>{
       Employee.findByPk(req.params.id).then((findItem)=>{
           if(!findItem){
               res.status(404).json('expense not found')
           }else{
               res.json(findItem)
           }
       }).catch((err)=>{
           res.status(500).json({msg: 'internal server error', err})
       })
   });

router.get('/user/:userId', (req, res)=>{
    const userId = req.params.userId
    Employee.findAll({
        where: {
            userId: userId,
        }
    }).then((findItem)=>{
        if(!findItem){
            res.status(404).json('Employee not found')
        }else{
            res.json(findItem)
        }
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
});

   router.put('/:id', withTokenAuth, (req,res)=>{
    Employee.update({
        username: req.body.username,
        hours: req.body.hours,
        payPerHour: req.body.payPerHour,
    },{
        where: {
            id: req.params.id
        }
    }).then((updatedItem)=>{
        if(!updatedItem){
            res.status(404).json('item not found')
        }else{
            res.json(updatedItem)
        }
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.delete('/:id', withTokenAuth, (req, res)=>{
    Employee.destroy({
        where: {
            id: req.params.id
        }
    }).then((delItem)=>{
        if(!delItem){
            res.status(404).json('item not found')
        }else{
            res.json(delItem)
        }
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})

module.exports = router