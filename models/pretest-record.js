"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PretestRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PretestRecord.init(
    {
      userId: DataTypes.INTEGER,
      level: DataTypes.INTEGER,
      myQues: DataTypes.STRING,
      myAns: DataTypes.STRING,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "PretestRecord",
      tableName: "PretestRecord",
      underscored: true,
    }
  );
  return PretestRecord;
};
