'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'ownerId' });
      this.hasMany(models.Order, { foreignKey: 'tourId' });
      this.hasMany(models.Comment, { foreignKey: 'tourId' });
    }
  }
  Tour.init(
    {
      ownerId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      startOfTheTour: DataTypes.DATE,
      endOfTheTour: DataTypes.DATE,
      price: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      duration: DataTypes.STRING,
      tourPhoto: DataTypes.TEXT,
      maxPeoples: DataTypes.INTEGER,
      longitude: DataTypes.STRING,
      latitude: DataTypes.STRING,
      remaindQuantity: DataTypes.INTEGER,
      reservedQuantity: DataTypes.INTEGER,
      gatherTime: DataTypes.TIME,
      adminAproved: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Tour',
    }
  );
  return Tour;
};
