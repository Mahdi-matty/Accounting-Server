const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Balance extends Model {
    get net(){
        return parseInt(this.income) - parseInt(this.expenses)
    }
   
 }

Balance.init({
    expenses: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    income: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  },
  {
    sequelize,
  }
);
  
module.exports = Balance;