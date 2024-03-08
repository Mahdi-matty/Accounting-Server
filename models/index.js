const Balance = require('./Balance')
const Employee = require('./Employee')
const Item = require('./Item')
const Loan = require('./Loan')
const MonthlyExpense = require('./MonthlyExpense')
const OneTimeExpense = require('./OneTimeExpense')
const Product = require('./Product')
const User = require('./User')

User.hasMany(Employee)
Employee.belongsTo(User)

