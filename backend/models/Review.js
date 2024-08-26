const { Model, DataTypes } = require("sequelize");

class Review extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        authorId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        rating: {
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
        modelName: "Review",
      }
    );
  }

  static associate(models) {
    Review.belongsTo(models.User, { as: "user", foreignKey: "userId" });
    Review.belongsTo(models.User, { as: "author", foreignKey: "authorId" });
  }
}

module.exports = Review;
