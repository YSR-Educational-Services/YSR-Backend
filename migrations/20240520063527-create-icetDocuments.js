"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("icetDocuments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      degreeLongMemo: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      degreeShortMemo: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      degreeProvisional: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      adhaarCardXerox: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      incomeCertificate: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      castCertificate: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      ROC: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      degreeTC: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      ICETHallTicket: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      ICETRankCard: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      _student: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "students",
          key: "id"
        }
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      semester1Certificate: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      semester2Certificate: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      semester3Certificate: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      semester4Certificate: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      semester5Certificate: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      semester6Certificate: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      semester7Certificate: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      semester8Certificate: {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      backlogCertificate: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable("icetDocuments");
  }
};
