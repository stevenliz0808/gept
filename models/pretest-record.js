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
      stuAccID: DataTypes.STRING,
      level: DataTypes.INTEGER,
      myQues: DataTypes.STRING,
      myAns: DataTypes.STRING,
      doneDate: DataTypes.DATE,
      createDate: {
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
