const sequelize = require('../config/connection');
const { Model, DataTypes} = require('sequelize');



class Employee extends Model {
  get monthPay(){
    return this.hours*this.payPerHour
  }
 }

Employee.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    payPerHour: {
      type: DataTypes.INTEGER,
      allowNull: false,
        defaultValue: 20
    },
  },
  {
    sequelize,
  }
);

module.exports = Employee