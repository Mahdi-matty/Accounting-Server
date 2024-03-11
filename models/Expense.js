const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');


class Expense extends Model { }

Expense.init({
    month : {
      type: DataTypes.STRING,
    },
    amount: {
      type: DataTypes.INTEGER,
    },
    detail: {
      type: DataTypes.JSON
    }
  },
  {
    sequelize,
  }
);
  
module.exports = Expense;