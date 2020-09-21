'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Shipping_Infos', [{
      itemId: 1,
      shippingMethod: "In-store pickup",
      addressLine1:"123 Dicks Sporting Goods",
      addressLine2:"Jefferson Road",
      city:"Rochester",
      state:"NY",
      zip:"14621",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      itemId: 2,
      shippingMethod: "Curbside Delivery",
      addressLine1:"12 Sporting Center",
      addressLine2:"Huntsville Road",
      city:"Rochester",
      state:"NY",
      zip:"14622",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      itemId: 3,
      shippingMethod: "Home Delivery",
      addressLine1:"12 BrookHill Ln",
      addressLine2:"Penfield Road",
      city:"Rochester",
      state:"NY",
      zip:"14625",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      itemId: 4,
      shippingMethod: "3rd Party",
      addressLine1:"12 Clintwood Ave",
      addressLine2:"Braid Street",
      city:"Rochester",
      state:"NY",
      zip:"14620",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Shipping_Infos', null, {});
  }
};


