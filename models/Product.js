const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {
    get total(){
        return this.size*this.price
    }
 }

Product.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER
    },
  },
  {
    sequelize,
  }
);
  
module.exports = Product;