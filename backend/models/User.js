// RentalCar/backend/models/User.js

const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            len: {
              args: [3, 30],
              msg: "Le nom d'utilisateur doit contenir entre 3 et 30 caractères",
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: {
              msg: "L'adresse email n'est pas valide",
            },
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [6, 100],
              msg: "Le mot de passe doit contenir entre 6 et 100 caractères",
            },
          },
        },
        role: {
          type: DataTypes.ENUM("user", "admin"),
          defaultValue: "user",
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        city: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        gender: {
          type: DataTypes.ENUM("homme", "femme"),
          allowNull: false,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            is: {
              args: /^[0-9+\-\s()]+$/,
              msg: "Le numéro de téléphone n'est pas valide",
            },
          },
        },
        profilePicture: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        roles: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "customer",
          get() {
            return this.getDataValue("roles").split(",");
          },
          set(val) {
            this.setDataValue("roles", val.join(","));
          },
        },
        permissions: {
          type: DataTypes.JSON,
          allowNull: false,
          defaultValue: ["VIEW_LISTINGS", "ADD_TO_CART"],
        },
        status: {
          type: DataTypes.ENUM("active", "inactive", "suspended"),
          defaultValue: "active",
        },
      },
      {
        sequelize,
        modelName: "User",
      }
    );
    return this;
  }

  static associate(models) {
    User.hasMany(models.Vehicle, {
      as: "ownedVehicles",
      foreignKey: "ownerId",
    });
    User.hasMany(models.Rating, { as: "givenRatings", foreignKey: "raterId" });
    User.hasMany(models.Rating, {
      as: "receivedRatings",
      foreignKey: "ratedId",
    });
    User.hasMany(models.Reservation);
    User.hasMany(models.Message, {
      as: "sentMessages",
      foreignKey: "senderId",
    });
    User.hasMany(models.Message, {
      as: "receivedMessages",
      foreignKey: "receiverId",
    });
  }
}

module.exports = User;
