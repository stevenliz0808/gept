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
      TPELoginDataID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      Identity: DataTypes.INTEGER,
      AccountID: DataTypes.STRING,
      Pwd: DataTypes.STRING,
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
      IsPrivacy: DataTypes.INTEGER,
      Privacy: DataTypes.DATE,
      CreateDate: DataTypes.DATE,
      PwdCheck: DataTypes.INTEGER,
      PwdDate: DataTypes.DATE,
      StudyStage: DataTypes.STRING,
      Gender: DataTypes.STRING,
      Expertise: DataTypes.STRING,
      ExpertiseName: DataTypes.STRING,
      Pros: DataTypes.STRING,
      City: DataTypes.STRING,
      Area: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TPELoginData",
    }
  );
  return TPELoginData;
};
