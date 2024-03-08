const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class MonthlyExpense extends Model { }

MonthlyExpense.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true
    },
    amount: {
      type: DataTypes.FLOAT
    },
  },
  {
    sequelize,
  }
);
  
module.exports = MonthlyExpense;