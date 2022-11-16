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
        type: Sequelize.INTEGER,
        defaultValue: 100, 
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('accounts');
  }
};
