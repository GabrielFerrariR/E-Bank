'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      'username': 'fulanosilva',
      'password': '$2b$10$vwyZetyW0tzUklp3CJMYm.vNP7qiwaB1wmWa5YxroYCh4AdcJVqw.', //P@ssw0rd
      'accountId': 1 
    },
    {
      'username': 'beutranocosta',
      'password': '$2b$10$PoM0V8ACWKhxMUmB37KFz.hx9WASO3cNYvY1YEY17JE9DIwSLlRea', //P@ssw0rd
      'accountId': 2
    },
    {
      'username': 'sicranooliveira',
      'password': '$2b$10$WKRyf1oovXXooh9b/r4xheYPUlSeaLBKAmiiqFa2MBj/XFcDCCQnC', //P@ssw0rd
      'accountId': 3
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
