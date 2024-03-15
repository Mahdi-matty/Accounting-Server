const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {MonthlyExpense} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection')
const { Op } = require('sequelize');


router.get('/', (req,res)=>{
    MonthlyExpense.findAll().then(allItem=>{
       res.json(allItem)
    }).catch((err)=>{
       res.status(500).json({msg: 'internal server error', err})
    })
   })
   
router.post('/', withTokenAuth,(req,res)=>{
       MonthlyExpense.create({
           title: req.body.title,
           amount: req.body.amount,
           content: req.body.content,
       }).then((newItem)=>{
           res.json(newItem)
       }).catch((err)=>{
           res.status(500).json({msg: 'internal server error', err})
       })
   });
   
router.get('/:id', (req, res)=>{
       MonthlyExpense.findByPk(req.params.id).then((findItem)=>{
           if(!findItem){
               res.status(404).json('loan not found')
           }else{
               res.json(findItem)
           }
       }).catch((err)=>{
           res.status(500).json({msg: 'internal server error', err})
       })
   });
router.get('/user/:userId', (req, res)=>{
    const userId = req.params.userId
    MonthlyExpense.findAll({
        where: {
            userId: userId,
        }
    }).then((findItem)=>{
        if(!findItem){
            res.status(404).json('Monthlyexpense not found')
        }else{
            res.json(findItem)
        }
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
});

   router.put('/:id', withTokenAuth, (req,res)=>{
    MonthlyExpense.update({
        title: req.body.title,
        amount: req.body.amount,
        content: req.body.content,
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
    MonthlyExpense.destroy({
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