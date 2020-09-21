'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Shipping_Info = sequelize.define('Shipping_Info',{
    itemId:{
      type:DataTypes.INTEGER,
      references: {
        model:'OrderItem_Info',
        key:'id',
        as:'itemId'
      }
    },
    shippingMethod: DataTypes.STRING,
    addressLine1: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING
  }, {});
  Shipping_Info.associate = function(models) {
    // associations are defined here
    Shipping_Info.belongsTo(models.OrderItem_Info,{
      foreignKey: 'itemId',
      onDelete: 'CASCADE'
    })
  };
  return Shipping_Info;
};
