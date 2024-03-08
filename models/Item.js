const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Item extends Model {
    get total(){
        return this.size*this.price
    }
 }

Item.init({
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
  
module.exports = Item;