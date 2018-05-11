'use strict';
module.exports = function(sequelize, DataTypes) {
  var Address = sequelize.define('Address', {
    pubkey: DataTypes.STRING,
    currency: DataTypes.STRING,
    ambassador_id: DataTypes.INTEGER
  }, {
    tableName: 'addresses',
    classMethods: {
      associate: function(models) {
        Address.belongsTo(models.Ambassador, { foreignKey: 'ambassador_id' });
      }
    }
  });
  return Address;
};
