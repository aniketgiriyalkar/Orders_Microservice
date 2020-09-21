'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Payment_Info = sequelize.define('Payment_Info',{
    itemId:{
      type:DataTypes.INTEGER,
      references: {
        model:'OrderItem_Info',
        key:'id',
        as:'itemId'
      }
    },
    paymentMethod: DataTypes.STRING,
    confirmationNumber: DataTypes.STRING,
    paymentAmount: DataTypes.DECIMAL,
    cardNumber: DataTypes.STRING,
    cardCVV: DataTypes.STRING
  }, {});
  Payment_Info.associate = function(models) {
    // associations are defined here
    Payment_Info.belongsTo(models.OrderItem_Info,{
      foreignKey: 'itemId',
      onDelete: 'CASCADE'
    })
  };
  return Payment_Info;
};
