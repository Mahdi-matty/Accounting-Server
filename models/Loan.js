const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Loan extends Model {
  get monthPayment(){
    
  }
 }

Loan.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    interest: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
  },
  {
    sequelize,
  }
);
  
module.exports = Loan;