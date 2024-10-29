"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      this.hasMany(models.Message, { foreignKey: "chatId" });
      this.belongsTo(models.User, { foreignKey: "sender" });
      this.belongsTo(models.User, { foreignKey: "recipient" });
    }
  }
  Chat.init(
    {
      sender: DataTypes.INTEGER,
      recipient: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Chat",
    }
  );
  return Chat;
};
