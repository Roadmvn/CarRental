// RentalCar/backend/models/Reservation.js

const { Model, DataTypes } = require("sequelize");

class Reservation extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        startDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        endDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        totalPrice: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
          defaultValue: "pending",
        },
      },
      {
        sequelize,
        modelName: "Reservation",
      }
    );
  }

  static associate(models) {
    Reservation.belongsTo(models.User);
    Reservation.belongsTo(models.Vehicle);
  }
}

module.exports = Reservation;
