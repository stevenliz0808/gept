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
      book: DataTypes.STRING,
      round: DataTypes.INTEGER,
      type: DataTypes.STRING,
      sort: DataTypes.INTEGER,
      examName: DataTypes.STRING,
      examNameCht: DataTypes.STRING,
      singleAns: DataTypes.STRING,
      showItem: DataTypes.INTEGER,
      ans1: DataTypes.STRING,
      ans1Cht: DataTypes.STRING,
      ans2: DataTypes.STRING,
      ans2Cht: DataTypes.STRING,
      ans3: DataTypes.STRING,
      ans3Cht: DataTypes.STRING,
      imgPath: DataTypes.STRING,
      voicePath: DataTypes.STRING,
      GEPTround: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ListeningData",
    }
  );
  return ListeningData;
};
