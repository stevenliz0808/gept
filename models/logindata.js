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
      ID: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      Identity: DataTypes.INTEGER,
      Name: DataTypes.STRING,
      NameEng: DataTypes.STRING,
      SchoolName: DataTypes.STRING,
      SchoolNo: DataTypes.STRING,
      ClassName: DataTypes.STRING,
      Mobile: DataTypes.STRING,
      MobileUse: DataTypes.STRING,
      Email: DataTypes.STRING,
      Address: DataTypes.STRING,
      LineID: DataTypes.STRING,
      ImgPath: DataTypes.STRING,
      StudyStage: DataTypes.STRING,
      Gender: DataTypes.STRING,
      Expertise: DataTypes.STRING,
      City: DataTypes.STRING,
      Town: DataTypes.STRING,
      CreateDate: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "LoginData",
      tableName: "TPELoginData",
    }
  );
  return TPELoginData;
};
