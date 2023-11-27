'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListeningAbilityTestRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ListeningAbilityTestRecord.init(
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      StuAccID: DataTypes.INTEGER,
      Round: DataTypes.INTEGER,
      Level: DataTypes.INTEGER,
      MyAns: DataTypes.INTEGER,
      UseTime: DataTypes.INTEGER,
      Range: DataTypes.STRING,
      DoneDate: DataTypes.DATE,
      CreateDate: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      GEPTabilityTestRecordID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ListeningTestRecord",
      tableName: "ListeningAbilityTestRecord",
    }
  );
  return ListeningAbilityTestRecord;
};