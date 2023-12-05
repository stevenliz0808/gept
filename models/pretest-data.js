"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExamDataNew extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExamDataNew.init(
    {
      ID: DataTypes.INTEGER,
      ExamTypeNewID: DataTypes.STRING,
      SingleAns: DataTypes.STRING,
      ExamName: DataTypes.STRING,
      ExamNameAns: DataTypes.STRING,
      ExamNameCht: DataTypes.STRING,
      Ans1: DataTypes.STRING,
      Ans2: DataTypes.STRING,
      Ans3: DataTypes.STRING,
      Ans4: DataTypes.STRING,
      Sort: DataTypes.INTEGER,
      ExamFrom: DataTypes.STRING,
      VideoCode: DataTypes.STRING,
      CreateDate: DataTypes.STRING,
      Ver: DataTypes.STRING,
      Year: DataTypes.INTEGER,
      Book: DataTypes.INTEGER,
      Month: DataTypes.INTEGER,
      ExamType: DataTypes.INTEGER,
      Memo: DataTypes.STRING,
      ExamType1: DataTypes.STRING,
      ExamType2: DataTypes.STRING,
      ExamType3: DataTypes.STRING,
      ImgPath: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PretestData",
      tableName: "ExamDataNew",
    }
  );
  return ExamDataNew;
};
