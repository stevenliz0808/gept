"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GEPTgramList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  GEPTgramList.init(
    {
      ID: DataTypes.INTEGER,
      GEPTgramText: DataTypes.STRING,
      Gram1: DataTypes.STRING,
      Gram11: DataTypes.STRING,
      Gram12: DataTypes.STRING,
      Gram13: DataTypes.STRING,
      Gram14: DataTypes.STRING,
      Gram15: DataTypes.STRING,
      Gram16: DataTypes.STRING,
      Gram2: DataTypes.STRING,
      Gram21: DataTypes.STRING,
      Gram22: DataTypes.STRING,
      Gram23: DataTypes.STRING,
      Gram24: DataTypes.STRING,
      Gram25: DataTypes.STRING,
      Gram26: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "GrammarList",
      tableName: "GEPTgramList",
    }
  );
  return GEPTgramList;
};
