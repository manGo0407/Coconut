'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
      this.belongsTo(models.User, { as: 'contact', foreignKey: 'contactId' });
      this.belongsTo(models.Tour, { foreignKey: 'tourId' });
    }
  }

  Order.init({
    userId: DataTypes.INTEGER,
    tourId: DataTypes.INTEGER,
    statusAccept: DataTypes.BOOLEAN,
    statusPay: DataTypes.BOOLEAN,
    peoplesBooked: DataTypes.INTEGER,
    contactId: DataTypes.INTEGER,
    statusBooked: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Order',
  });


  return Order;
};
