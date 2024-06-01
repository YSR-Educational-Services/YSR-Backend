"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("EapcetDocuments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sscLongMemo: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      sscShortMemo: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      interLongMemo: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      interShortMemo: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      bonafideCertificate: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      interTC: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      EAPCETHallTicket: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      EAPCETRankCard: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      _student: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "students",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("EapcetDocuments");
  }
};
