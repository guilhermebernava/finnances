"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //associa a FK dele a trabalha OBJECTIVES
      User.hasMany(models.Objectives, {
        foreignKey: "objectives_id",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
    modelName: 'User',
      paranoid: true,
    }
  );
  return User;
};
