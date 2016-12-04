'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Deals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      campaignID: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      dealStatus: {
        type: Sequelize.STRING
      },
      salesperson: {
        type: Sequelize.STRING
      },
      revenue: {
        type: Sequelize.STRING
      },
      month: {
        type: Sequelize.STRING
      },
      closeDate: {
        type: Sequelize.STRING
      },
      dealType: {
        type: Sequelize.STRING
      },
      vertical: {
        type: Sequelize.STRING
      },
      newVersusReturning: {
        type: Sequelize.STRING
      },
      productLine: {
        type: Sequelize.STRING
      },country: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Deals');
  }
};