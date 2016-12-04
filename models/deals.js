'use strict';

module.exports = function(sequelize, DataTypes) {
  var Deals = sequelize.define('Deals', {
    campaignID: DataTypes.STRING,
    name: DataTypes.STRING,
    dealStatus: DataTypes.STRING,
    salesperson: DataTypes.STRING,
    revenue: DataTypes.STRING,
    month: DataTypes.STRING,
    closeDate: DataTypes.STRING,
    dealType: DataTypes.STRING,
    vertical: DataTypes.STRING,
    newVersusReturning: DataTypes.STRING,
    productLine: DataTypes.STRING,
    country: DataTypes.STRING

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Deals;
};