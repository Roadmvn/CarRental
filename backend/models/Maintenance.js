// RentalCar/backend/models/Maintenance.js

const { Model, DataTypes } = require("sequelize");

class Maintenance extends Model {
  static init(sequelize) {
    return super.init(
      {
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        cost: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Maintenance",
      }
    );
  }

  static associate(models) {
    Maintenance.belongsTo(models.Vehicle);
  }
}

module.exports = Maintenance;
