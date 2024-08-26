// RentalCar/backend/models/Promotion.js

const { Model, DataTypes } = require("sequelize");

class Promotion extends Model {
  static init(sequelize) {
    return super.init(
      {
        code: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        discount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Promotion",
      }
    );
  }

  static associate(models) {
    Promotion.belongsTo(models.Vehicle);
  }
}

module.exports = Promotion;
