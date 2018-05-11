'use strict';

module.exports = function(sequelize, DataTypes) {
  var Ambassador = sequelize.define('Ambassador', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    uid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
  }, {
    tableName: 'ambassadors',
    classMethods: {
      associate: function(models) {
        Ambassador.hasMany(models.Address, {foreignKey: 'ambassador_id'});
        // associations can be defined here
      }
    }
  });
  return Ambassador;
};
