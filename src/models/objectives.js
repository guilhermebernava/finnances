"use strict";
const { Model } = require("sequelize");
const { Z_ASCII } = require("zlib");
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
        foreignKey: "User_Id",
      });
    }
  }
  Objectives.init(
    {
      value: DataTypes.DOUBLE,
      installments_quantity: DataTypes.INTEGER,
      adquired_value: DataTypes.DOUBLE,
      due_date: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Objectives",

      //toda as QUERY no banco vai ter essa validacao para trazer os dados
      // defaultScope: {
      //   where: {
      //     due_date: Date.now() < due_date,
      //   },
      // },

      //outros escopos que voce pode criar dentro do codigo

      //para usar os SCOPES antes do metodo FIND ALL passar o metodo dessa froma
      //database.User.scope('all').findAll()
      // scopes: {
      //   all: { where: {} },
      // },
    }
  );
  return Objectives;
};
