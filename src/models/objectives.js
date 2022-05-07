'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Objectives extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //associa o USER ao OBJECTIVES
      Objectives.belongsTo(models.User, {
        foreignKey: "User_Id"
      })
    }
  }
  Objectives.init({
    value: DataTypes.DOUBLE,
    installments_quantity: DataTypes.INTEGER,
    adquired_value: DataTypes.DOUBLE,
    due_date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Objectives',
  });
  return Objectives;
};
