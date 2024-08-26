// RentalCar/backend/models/Vehicle.js

const { Model, DataTypes } = require("sequelize");

class Vehicle extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        brand: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        model: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        year: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM("sale", "rental"),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Vehicle",
      }
    );
  }

  static associate(models) {
    Vehicle.belongsTo(models.User);
    Vehicle.belongsTo(models.Category);
  }
}

module.exports = Vehicle;
