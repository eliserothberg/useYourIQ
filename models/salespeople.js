'use strict';
module.exports = function(sequelize, DataTypes) {
  var Salespeople = sequelize.define('Salespeople', {
    salesLead: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Salespeople;
};