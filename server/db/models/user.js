"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Tour, { foreignKey: "ownerId" });
      this.hasMany(models.Order, { foreignKey: "userId" });
      this.hasMany(models.Message, { foreignKey: "userId" });
      this.hasMany(models.Chat, { foreignKey: "sender" });
      this.hasMany(models.Chat, { foreignKey: "recipient" });
      this.hasMany(models.Comment, { foreignKey: "userId" });
      this.hasMany(models.Order, { foreignKey: "contactId" });
    }
  }
  User.init(
    {
      login: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      markQuantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      rating: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
      },
      photoUser: DataTypes.TEXT,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      experience: DataTypes.INTEGER,
      age: DataTypes.INTEGER,
      aboutMe: DataTypes.TEXT,
      resetToken: DataTypes.STRING,
      resetTokenExp: DataTypes.DATE,
      isAdmin: DataTypes.BOOLEAN,
      checkedByAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
