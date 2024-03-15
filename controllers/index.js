const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const withTokenAuth = require('../middleware/withTokenAuth');
const {User} = require('../models')
require('dotenv').config();
const jwt = require('jsonwebtoken')

const userRoutes = require('./userRoutes')
router.use('/api/users', userRoutes)

const productRoutes = require('./productRoutes')
router.use('/api/products', productRoutes)

const itemRoutes = require('./itemRoutes')
router.use('/api/items', itemRoutes)

const employeeRoutes = require('./employeeRoutes')
router.use('/api/employees', employeeRoutes)

const loadRoutes= require('./loanRoutes')
router.use('/api/loan', loadRoutes)

const monthExpRoutes = require('./monthExpenseRoutes')
router.use('/api/monthexpens', monthExpRoutes)

const oneTimeExpense = require('./oneTimeRoutes')
router.use('/api/onetime', oneTimeExpense)

const expenseRoutes = require('./expense')
router.use('/api/expense', expenseRoutes)

const balanceRoutes = require('./balanceRoutes')
router.use('/api/balance', balanceRoutes)



router.get('/tokenData', (req,res)=>{
    console.log('Headers:', req.headers);
    const token = req?.headers?.authorization?.split(" ")[1];
    console.log(token)
    console.log('==============================')
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded)
        const userName = decoded.username
        User.findOne({
            where: {
                username: userName
            }
        }).then(foundUser => {
            if (foundUser) {
                return res.json(foundUser);
            } else {
                throw new Error('User not found');
            }})
    } catch(err){
        console.log(err);
       return  res.status(403).json({msg:"invalid token!"})
    }
});

module.exports= router