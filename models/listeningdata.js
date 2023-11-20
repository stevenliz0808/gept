"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ListeningData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ListeningData.init(
    {
      ListeningDataID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      Book: DataTypes.STRING,
      Round: DataTypes.INTEGER,
      Type: DataTypes.STRING,
      Sort: DataTypes.INTEGER,
      ExamName: DataTypes.STRING,
      ExamNameCht: DataTypes.STRING,
      SingleAns: DataTypes.STRING,
      ShowItem: DataTypes.INTEGER,
      Ans1: DataTypes.STRING,
      Ans1Cht: DataTypes.STRING,
      Ans2: DataTypes.STRING,
      Ans2Cht: DataTypes.STRING,
      Ans3: DataTypes.STRING,
      Ans3Cht: DataTypes.STRING,
      ImgPath: DataTypes.STRING,
      VoicePath: DataTypes.STRING,
      GEPTround: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ListeningData",
    }
  );
  return ListeningData;
};
