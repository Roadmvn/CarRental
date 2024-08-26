// RentalCar/backend/models/Category.js

const { Model, DataTypes } = require("sequelize");

class Category extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.TEXT,
        },
      },
      {
        sequelize,
        modelName: "Category",
      }
    );
  }

  static associate(models) {
    Category.hasMany(models.Vehicle);
  }
}

module.exports = Category;
