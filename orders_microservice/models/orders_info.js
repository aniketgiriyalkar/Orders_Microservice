'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Orders_Info = sequelize.define('Orders_Info', {
    customerId: DataTypes.STRING,
    customerName: DataTypes.STRING,
    customerEmail: DataTypes.STRING
  }, {});
  Orders_Info.associate = function(models){
    // associations can be defined here
    Orders_Info.hasMany(models.OrderItem_Info, {
      foreignKey: 'orderId'
    })
  };
  return Orders_Info;
};