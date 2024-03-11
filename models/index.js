const Balance = require('./Balance')
const Employee = require('./Employee')
const Item = require('./Item')
const Loan = require('./Loan')
const MonthlyExpense = require('./MonthlyExpense')
const OneTimeExpense = require('./OneTimeExpense')
const Product = require('./Product')
const User = require('./User')
const Expense = require('./Expense')

User.hasMany(Employee)
Employee.belongsTo(User)

User.hasMany(Balance)
Balance.belongsTo(User)

User.hasMany(Item)
Item.belongsTo(User)

User.hasMany(Product)
Product.belongsTo(User)

User.hasMany(OneTimeExpense)
OneTimeExpense.belongsTo(User)

User.hasMany(MonthlyExpense)
MonthlyExpense.belongsTo(User)

User.hasMany(Loan)
Loan.belongsTo(User)

User.hasMany(Expense)
Expense.belongsTo(User)

Expense.hasMany(Item)
Item.belongsTo(Expense)

Expense.hasMany(Employee)
Employee.belongsTo(Expense)

Expense.hasMany(MonthlyExpense)
MonthlyExpense.belongsTo(Expense)

Expense.hasMany(OneTimeExpense)
OneTimeExpense.belongsTo(Expense)

Expense.hasMany(Loan)
Loan.belongsTo(Expense)

Balance.hasOne(Expense)
Balance.hasMany(Product)

module.exports = {
    Balance,
    Employee,
    Expense,
    Item,
    Loan,
    MonthlyExpense,
    OneTimeExpense,
    Product,
    User
}

