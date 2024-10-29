'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Tour, { foreignKey: 'tourId' });
    }
  }
  Comment.init({
    userId: DataTypes.INTEGER,
    tourId: DataTypes.INTEGER,
    value: DataTypes.TEXT,
    isCheckedByAdmin: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};