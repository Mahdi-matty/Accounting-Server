const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Loan extends Model {
  get monthPayment(){
    return (this.amount/this.duration)+(this.interest*(this.amount/this.duration))
  }
 }

Loan.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
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