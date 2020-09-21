'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const OrderItem_Info = sequelize.define('OrderItem_Info',{
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model:'Orders_Info',
        key:'id',
        as:'orderId',
      }
    },
    itemName: DataTypes.STRING,
    itemQty: DataTypes.INTEGER,
    orderShippingCharges: DataTypes.DECIMAL,
    orderSubTotal: DataTypes.DECIMAL,
    orderTax: DataTypes.DECIMAL,
    orderTotal: DataTypes.DECIMAL,
    status: DataTypes.STRING
  }, {});

  OrderItem_Info.associate = function (models){
    // associations are defined here
    OrderItem_Info.belongsTo(models.Orders_Info,{
      foreignKey: 'orderId',
      onDelete: 'CASCADE'
    }),
    OrderItem_Info.hasOne(models.Shipping_Info,{
      foreignKey:'itemId'
    }),
    OrderItem_Info.hasOne(models.Billing_Info,{
      foreignKey:'itemId'
    }),
    OrderItem_Info.hasMany(models.Payment_Info,{
      foreignKey:'itemId'
    })
  };

  return OrderItem_Info;
};