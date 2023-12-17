"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TPELoginData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TPELoginData.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "LoginData",
      tableName: "TPELoginData",
      underscored: true
    }
  );
  return TPELoginData;
};
