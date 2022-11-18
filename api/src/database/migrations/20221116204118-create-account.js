'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, 
        type: Sequelize.INTEGER 
      },
      balance: {
        allowNull: false,
        type: Sequelize.DECIMAL(15,2),
        defaultValue: 100.00, 
      }
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('accounts');
  }
};
