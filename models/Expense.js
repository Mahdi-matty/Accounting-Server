const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const Employee = require('./Employee')
const Item = require('./Item')
const Loan = require('./Loan')
const MonthlyExpense = require('./MonthlyExpense')
const OneTimeExpense = require('./OneTimeExpense')

class Expense extends Model {
    get net(){
        return parseInt(this.income) - parseInt(this.expenses)
    }
   
 }

Expense.init({
    employeeExpense: {
      type: DataTypes.INTEGER,
      references: {
        Model: Employee,
        key: 'monthPay'
      }
    },
    itemExpense: {
        type: DataTypes.INTEGER,
        references: {
          Model: Item,
          key: 'total'
        }
      },
      loanExpense: {
        type: DataTypes.INTEGER,
        references: {
          Model: Loan,
          key: 'monethPayment'
        }
      },
      monethlyExpense: {
        type: DataTypes.INTEGER,
        references: {
          Model: MonthlyExpense,
          key: 'amount'
        }
      },
      oneTimeExpense: {
        type: DataTypes.INTEGER,
        references: {
          Model: OneTimeExpense,
          key: 'amount'
        }
      },
  },
  {
    sequelize,
  }
);
  
module.exports = Expense;