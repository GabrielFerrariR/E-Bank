'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      username: 'johndoe',
      password: 'password',
      accountId: 1
    },
    {
      username: 'elvisjohnson',
      password: 'password',
      accountId: 2
    },
    {
      username: 'eliasthomas',
      password: 'password',
      accountId: 3
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
