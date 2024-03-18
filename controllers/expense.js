const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {Expense} = require('../models');
const jwt = require("jsonwebtoken");
const withTokenAuth = require('../middleware/withTokenAuth');
const Sequlize= require('../config/connection')
const { Op } = require('sequelize');



router.get('/', (req,res)=>{
    Expense.findAll().then(allItem=>{
       res.json(allItem)
    }).catch((err)=>{
       res.status(500).json({msg: 'internal server error', err})
    })
   })
   
router.post('/', withTokenAuth,(req,res)=>{
       Expense.create({
           month: req.body.month,
           amount: req.body.amount,
           detail: req.body.detail,
           UserId: req.body.userId
       }).then((newItem)=>{
           res.json(newItem)
       }).catch((err)=>{
           res.status(500).json({msg: 'internal server error', err})
       })
   });
   
router.get('/:id', (req, res)=>{
       Expense.findByPk(req.params.id).then((findItem)=>{
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
    Expense.update({
        month: req.body.month,
        amount: req.body.amount,
        detail: req.body.detail,
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
    Expense.destroy({
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

router.get('/month/:monthId/user/:userId', async (req, res)=>{
    const userId = req.params.userId;
    const monthId = req.params.monthId;
    try {
        const [year, month] = monthId.split('-');
        const firstDayOfMonth = new Date(year, month - 1, 1);
        const lastDayOfMonth = new Date(year, month, 0);

        const expenses = await Expense.findAll({
            where: {
                userId: userId,
                createdAt: {
                    [Op.between]: [firstDayOfMonth, lastDayOfMonth]
                }
            }
        });

        res.json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router