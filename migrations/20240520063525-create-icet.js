"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("icet", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      degreeClgName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      university: {
        type: Sequelize.STRING,
        allowNull: false
      },
      degreePassingYear: {
        type: Sequelize.STRING,
        allowNull: false
      },
      degreeObtainedMarks: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      degreePercentage: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ICETHallTicketNo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ICETRank: {
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
    await queryInterface.dropTable("icet");
  }
};
