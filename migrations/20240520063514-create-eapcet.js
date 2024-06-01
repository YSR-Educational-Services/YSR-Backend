"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Eapcet", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sscSchoolName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      sscPassingYear: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sscPercentage: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      hscSchoolName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      hscPassingYear: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      hscPercentage: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      EAPCETHallTicketNo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      EAPCETRank: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Eapcet");
  }
};
