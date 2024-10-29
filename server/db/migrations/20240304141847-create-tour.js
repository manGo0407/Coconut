'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tours', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ownerId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      name: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      startOfTheTour: {
        type: Sequelize.DATEONLY,
      },
      endOfTheTour: {
        type: Sequelize.DATEONLY,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.TEXT,
      },
      duration: {
        type: Sequelize.STRING,
      },
      tourPhoto: {
        type: Sequelize.TEXT,
      },
      maxPeoples: {
        type: Sequelize.INTEGER,
      },
      longitude: {
        type: Sequelize.STRING,
      },
      latitude: {
        type: Sequelize.STRING,
      },
      remaindQuantity: {
        type: Sequelize.INTEGER,
      },
      reservedQuantity: {
        type: Sequelize.INTEGER,
      },
      gatherTime: {
        type: Sequelize.TIME,
      },
      adminAproved: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tours');
  },
};
