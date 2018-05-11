'use strict';
module.exports = function(sequelize, DataTypes) {
  var Activation = sequelize.define('Activation', {
    ambassador_id: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    address: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    txid: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Activation;
};