'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('OrderItem_Infos', [{
      orderId: 1,
      itemName: "Soccer Cap - Arsenal",
      itemQty: 1,
      orderShippingCharges: 12.75,
      orderSubTotal: 27.05,
      orderTax: 3.20,
      orderTotal: 43.0,
      status: "Processed and shipped",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      orderId: 2,
      itemName: "Soccer Shirt - Arsenal",
      itemQty: 1,
      orderShippingCharges: 12.75,
      orderSubTotal: 67.05,
      orderTax: 3.20,
      orderTotal: 83.0,
      status: "Out for delivery",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      orderId: 1,
      itemName: "Soccer Jacket - Arsenal",
      itemQty: 1,
      orderShippingCharges: 12.75,
      orderSubTotal: 147.05,
      orderTax: 3.20,
      orderTotal: 163.0,
      status: "Out for delivery",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      orderId: 3,
      itemName: "Soccer Shorts - Arsenal",
      itemQty: 2,
      orderShippingCharges: 12.75,
      orderSubTotal: 47.05,
      orderTax: 3.20,
      orderTotal: 63.0,
      status: "Delivered",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('OrderItem_Infos', null, {});
  }
};
