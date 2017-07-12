'use strict';
module.exports = function(sequelize, DataTypes) {
  var ItemsTodo = sequelize.define('ItemsTodo', {
    title: DataTypes.STRING,
    order: DataTypes.INTEGER,
    completed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return ItemsTodo;
};