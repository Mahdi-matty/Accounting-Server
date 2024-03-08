const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class OneTimeExpense extends Model { }

OneTimeExpense.init({
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
  
module.exports = OneTimeExpense;