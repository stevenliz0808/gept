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
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "ListeningDataID",
      },
      book: DataTypes.STRING,
      round: DataTypes.INTEGER,
      type: DataTypes.STRING,
      sort: DataTypes.INTEGER,
      examName: DataTypes.STRING,
      examNameCht: DataTypes.STRING,
      standardAns: {
        type: DataTypes.STRING,
        field: 'singleAns'
      },
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
      tableName: "ListeningData",
    }
  );
  return ListeningData;
};
