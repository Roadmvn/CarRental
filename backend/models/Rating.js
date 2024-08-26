// RentalCar/backend/models/Rating.js

const { Model, DataTypes } = require("sequelize");

class Rating extends Model {
  static init(sequelize) {
    return super.init(
      {
        score: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 1,
            max: 5,
          },
        },
        comment: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "Rating",
      }
    );
  }

  static associate(models) {
    Rating.belongsTo(models.User, { as: "rater", foreignKey: "raterId" });
    Rating.belongsTo(models.User, { as: "rated", foreignKey: "ratedId" });
    Rating.belongsTo(models.Vehicle);
  }
}

module.exports = Rating;
