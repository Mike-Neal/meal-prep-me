const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Calendar extends Model { }

Calendar.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    recipe_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipe_thumbnail: {
      type: DataTypes.TEXT('long'),
      //   allowNull: false,
    },
    recipe_ingredients: {
      type: DataTypes.JSON,
      //   allowNull: false,
    },
    recipe_calories: {
      type: DataTypes.INTEGER,
      //   allowNull: false,
    },
    recipe_instructions: {
      type: DataTypes.STRING,
      //   allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE'
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'recipe',
  }
);

module.exports = Calendar;