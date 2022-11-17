'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('accounts', [{
      balance: 100
    },{
      balance: 100
    },{
      balance: 100
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Accounst', null, {});
  }
};
