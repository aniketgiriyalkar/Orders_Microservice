'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Billing_Info = sequelize.define('Billing_Info',{
    itemId:{
      type:DataTypes.INTEGER,
      references: {
        model:'OrderItem_Info',
        key:'id',
        as:'itemId'
      }
    },
    addressLine1: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING
  }, {});
  Billing_Info.associate = function(models) {
    // associations are defined here
    Billing_Info.belongsTo(models.OrderItem_Info,{
      foreignKey: 'itemId',
      onDelete: 'CASCADE'
    })
  };
  return Billing_Info;
};
