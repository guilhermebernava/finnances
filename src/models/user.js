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
      name: {
        type: DataTypes.STRING,
        validate: {
          //custom validation
          nameValidator: function (name) {
            if (name.length < 3)
              throw new Error("name have to has more than 4 Caracters");
          },
        },
      },
      //dentro das propriedades podemos passar o VALIDATE
      email: {
        type: DataTypes.STRING,
        //ele tem vários tipos de validações padrão e ainda podemos criar
        //nossas proprias validações, lembrando que ele joga um ERRO COM THROW
        validate: {
          isEmail: {
            args: true,
            msg: "INVALID EMAIL",
          },
        },
      },
      password: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
      role: DataTypes.STRING,
      emailVerified: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
    }
  );
  return User;
};
