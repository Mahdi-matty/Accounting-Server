const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Product, User} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection')
const { Op } = require('sequelize');


router.get('/', (req,res)=>{
    Product.findAll({
        attributes: {
            include: [
                [Sequlize.literal('size * price'), 'total']
            ]
        }
    }).then(allproduct=>{
       res.json(allproduct)
    }).catch((err)=>{
       res.status(500).json({msg: 'internal server error', err})
    })
   })
   
router.post('/', withTokenAuth,(req,res)=>{
       Product.create({
           title: req.body.title,
           size: req.body.size,
           price: req.body.price,
           UserId: req.body.userId
       }).then((newProduct)=>{
           res.json(newProduct)
       }).catch((err)=>{
           res.status(500).json({msg: 'internal server error', err})
       })
   });
   
router.get('/:id', (req, res)=>{
       Product.findByPk(req.params.id, {
        attributes: {
            include: [
                [Sequlize.literal('size * price'), 'total']
            ]
        }
       }).then((findproduct)=>{
           if(!findproduct){
               res.status(404).json('product not found')
           }else{
               res.json(findproduct)
           }
       }).catch((err)=>{
           res.status(500).json({msg: 'internal server error', err})
       })
   });

router.get('/user/:userId', withTokenAuth, (req, res)=>{
    const userId = req.params.userId
    Product.findAll({
        where: {
            userId: userId,
        },
        attributes: {
            include: [
                [Sequlize.literal('size * price'), 'total']
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

router.get('/user/:userId/month/:monthId', withTokenAuth, async(req, res)=>{
    const userId = req.params.userId
    const monthId = req.params.monthId
    try {
        const [year, month] = monthId.split('-');
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const lastDayOfMonth = new Date(year, month, 0);

        const incomes = await Product.findAll({
            where: {
                userId: userId,
                createdAt: {
                    [Op.between]: [firstDayOfMonth, lastDayOfMonth]
                }
            }, attributes: {
                include: [
                    [Sequlize.literal('size * price'), 'total']
                ]
            }
        });

        res.json(incomes);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

   router.put('/:id', withTokenAuth, (req,res)=>{
    Product.update({
        title: req.body.title,
        size: req.body.size,
        price: req.body.price,
    },{
        where: {
            id: req.params.id
        }
    }).then((updatedProd)=>{
        if(!updatedProd){
            res.status(404).json('product not found')
        }else{
            res.json(updatedProd)
        }
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})

router.delete('/:id', withTokenAuth, (req, res)=>{
    Product.destroy({
        where: {
            id: req.params.id
        }
    }).then((delsub)=>{
        if(!delsub){
            res.status(404).json('product not found')
        }else{
            res.json(delsub)
        }
    }).catch((err)=>{
        res.status(500).json({msg: 'internal server error', err})
    })
})

module.exports = router