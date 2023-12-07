"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AbilityTestRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AbilityTestRecord.init(
    {
      ID: DataTypes.INTEGER,
      StuAccID: DataTypes.STRING,
      Level: DataTypes.INTEGER,
      MyQuestion: DataTypes.STRING,
      MyAns: DataTypes.STRING,
      DoneDate: DataTypes.DATE,
      CreateDate: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "PretestRecord",
      tableName: "AbilityTestRecord",
    }
  );
  return AbilityTestRecord;
};
