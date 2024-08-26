// RentalCar/backend/models/Message.js

const { Model, DataTypes } = require("sequelize");

class Message extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
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
        modelName: "Message",
      }
    );
  }

  static associate(models) {
    Message.belongsTo(models.User, { as: "sender", foreignKey: "senderId" });
    Message.belongsTo(models.User, {
      as: "receiver",
      foreignKey: "receiverId",
    });
  }
}

module.exports = Message;
