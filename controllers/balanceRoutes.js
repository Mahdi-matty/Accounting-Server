const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Expense, Balance, Product} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection')
const { Op } = require('sequelize');



router.get('/', (req,res)=>{
    Balance.findAll().then(allItem=>{
       res.json(allItem)
    }).catch((err)=>{
       res.status(500).json({msg: 'internal server error', err})
    })
   })
   
router.post('/', withTokenAuth,(req,res)=>{
       Balance.create({
           expenses: req.body.expenses,
           income: req.body.income,
       }).then((newItem)=>{
           res.json(newItem)
       }).catch((err)=>{
           res.status(500).json({msg: 'internal server error', err})
       })
   });
   
router.get('/:id', (req, res)=>{
       Balance.findByPk(req.params.id).then((findItem)=>{
           if(!findItem){
               res.status(404).json('loan not found')
           }else{
               res.json(findItem)
           }
       }).catch((err)=>{
           res.status(500).json({msg: 'internal server error', err})
       })
   });

   router.put('/:id', withTokenAuth, (req,res)=>{
    Balance.update({
        expenses: req.body.expenses,
        income: req.body.income,
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
    Balance.destroy({
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

router.get('/month/:monthId', async (req, res)=>{
   const monthId = req.params.monthId
    try {
        const [year, month] = monthId.split('-');
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const lastDayOfMonth = new Date(year, month, 0);

        const balances = await Balance.findAll({
            where: {
                date: {
                    [Op.between]: [firstDayOfMonth, lastDayOfMonth]
                }
            }
        });

        res.json(balances);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router