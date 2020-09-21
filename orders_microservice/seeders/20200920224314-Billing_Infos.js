'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Billing_Infos', [{
      itemId: 1,
      addressLine1:"123 ParkPoint",
      addressLine2:"Jefferson Road",
      city:"Rochester",
      state:"NY",
      zip:"14621",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      itemId: 2,
      addressLine1:"12 Rustic Village",
      addressLine2:"Huntsville Road",
      city:"Rochester",
      state:"NY",
      zip:"14622",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      itemId: 3,
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
    await queryInterface.bulkDelete('Billing_Infos', null, {});
  }
};


