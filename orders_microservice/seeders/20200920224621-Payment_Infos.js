'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Payment_Infos', [{
      itemId: 1,
      paymentMethod: "Credit Card",
      confirmationNumber: "123",
      paymentAmount: 43.0,
      cardNumber: "1234-4321-1234-4321",
      cardCVV: "321",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      itemId: 2,
      paymentMethod: "Debit Card",
      confirmationNumber: "123",
      paymentAmount: 83.0,
      cardNumber: "1234-4341-5234-4721",
      cardCVV: "371",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      itemId: 3,
      paymentMethod: "Credit Card",
      confirmationNumber: "123",
      paymentAmount: 43.0,
      cardNumber: "1234-4321-1234-4321",
      cardCVV: "321",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      itemId: 3,
      paymentMethod: "Debit Card",
      confirmationNumber: "123",
      paymentAmount: 120.0,
      cardNumber: "1134-4322-1231-8321",
      cardCVV: "821",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      itemId: 4,
      paymentMethod: "Debit Card",
      confirmationNumber: "123",
      paymentAmount: 63.0,
      cardNumber: "9234-4321-1234-4321",
      cardCVV: "921",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Payment_Infos', null, {});
  }
};


