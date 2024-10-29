'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      this.belongsTo(models.Chat, { foreignKey: 'chatId'})
      this.belongsTo(models.User, { foreignKey: 'userId'})
    }
  }
  Message.init({
    userId: DataTypes.INTEGER,
    chatId: DataTypes.INTEGER,
    value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};