"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StudyProgramFourHours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  StudyProgramFourHours.init(
    {
      level: DataTypes.INTEGER,
      grammarIdStart: DataTypes.INTEGER,
      grammarWeek: DataTypes.INTEGER,
      reviewWeek: DataTypes.INTEGER,
      readingWeekStart: DataTypes.INTEGER,
      wordPerWeek: DataTypes.INTEGER,
      missingWordPerWeek: DataTypes.INTEGER,
      readingPerWeek: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "StudyPlanFourHours",
      tableName: "StudyPlanFourHours",
      underscored: true,
    }
  );
  return StudyProgramFourHours;
};
