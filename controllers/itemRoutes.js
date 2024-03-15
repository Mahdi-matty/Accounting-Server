const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Item, User} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequelize= require('../config/connection')
const { Op } = require('sequelize');


router.get('/', (req,res)=>{
    Item.findAll({
        attributes: {
            include: [
                [Sequelize.literal('size * price'), 'total']
            ]
        }
    }).then(allItem=>{
       res.json(allItem)
    }).catch((err)=>{
       res.status(500).json({msg: 'internal server error', err})
    })
   })
   
router.post('/', withTokenAuth,(req,res)=>{
       Item.create({
           title: req.body.title,
           size: req.body.size,
           price: req.body.price,
           UserId: req.body.userId
       }).then((newItem)=>{
           res.json(newItem)
       }).catch((err)=>{
           res.status(500).json({msg: 'internal server error', err})
       })
   });
   
router.get('/:id', (req, res)=>{
       Item.findByPk(req.params.id, {
        attributes: {
            include: [
                [Sequelize.literal('size * price'), 'total']
            ]
        }
       }).then((findItem)=>{
           if(!findItem){
               res.status(404).json('product not found')
           }else{
               res.json(findItem)
           }
       }).catch((err)=>{
           res.status(500).json({msg: 'internal server error', err})
       })
   });

   router.get('/user/:userId', (req, res)=>{
    const userId = req.params.userId
    Item.findAll({
        where: {
            userId: userId,
        },
         attributes: {
            include: [
                [Sequelize.literal('size * price'), 'total']
            ]
        }
    }).then((findItem)=>{
        if(!findItem || findItem.length == 0){
            res.status(404).json('item not found')
        }else{
            res.json(findItem)
        }
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
});

   router.put('/:id', withTokenAuth, (req,res)=>{
    Item.update({
        title: req.body.title,
        size: req.body.size,
        price: req.body.price,
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
    Item.destroy({
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