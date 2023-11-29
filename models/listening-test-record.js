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
      MyAns: DataTypes.STRING,
      CheckedAns: DataTypes.STRING,
      UseTime: DataTypes.INTEGER,
      Range: DataTypes.STRING,
      DoneDate: DataTypes.DATE,
      GEPTabilityTestRecordID: DataTypes.INTEGER,
      CreateDate: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      modelName: "ListeningTestRecord",
      tableName: "ListeningAbilityTestRecord",
    }
  );
  return ListeningAbilityTestRecord;
};