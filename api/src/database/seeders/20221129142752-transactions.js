'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('transactions', [
      { 
        debitedAccountId:1,
        creditedAccountId:2, 
        value:15.1,
        createdAt: '2022-11-27 14:58:34.864+00',
        updatedAt: '2022-11-27 14:58:34.864+00'
      },
      { 
        debitedAccountId:2,
        creditedAccountId:1, 
        value:20.50,
        createdAt: '2022-08-11 14:58:34.864+00',
        updatedAt: '2022-11-27 14:58:34.864+00'
      },
      { 
        debitedAccountId:3,
        creditedAccountId:1, 
        value:40,
        createdAt: '2022-08-11 14:58:34.864+00',
        updatedAt: '2022-11-27 14:58:34.864+00'
      },
      { 
        debitedAccountId:2,
        creditedAccountId:3, 
        value: 2,
        createdAt: '2022-09-01 14:58:34.864+00',
        updatedAt: '2022-11-27 14:58:34.864+00'
      },
      { 
        debitedAccountId:3,
        creditedAccountId:1, 
        value: 26,
        createdAt: '2022-11-01 14:58:34.864+00',
        updatedAt: '2022-11-27 14:58:34.864+00'
      },
    ])
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('transactions', null, {});
  }
};

//id,debitedAccountId,creditedAccountId,value,createdAt,updatedAt