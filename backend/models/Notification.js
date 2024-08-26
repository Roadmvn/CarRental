// RentalCar/backend/models/Notification.js

const { Model, DataTypes } = require("sequelize");

class Notification extends Model {
  static init(sequelize) {
    return super.init(
      {
        message: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        isRead: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: "Notification",
      }
    );
  }

  static associate(models) {
    Notification.belongsTo(models.User);
  }
}

module.exports = Notification;
