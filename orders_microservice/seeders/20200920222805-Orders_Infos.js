'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Orders_Infos', [{
      customerId: "CUST01",
      customerName: "Jack Ryan",
      customerEmail: "ryanj@mail.com",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      customerId: "CUST02",
      customerName: "Sherlock Holmes",
      customerEmail: "sholmes@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      customerId: "CUST03",
      customerName: "Ethan Hunt",
      customerEmail: "ehunt@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders_Infos', null, {});
  }
};
