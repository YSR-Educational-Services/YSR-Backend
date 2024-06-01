"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ecet", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      polytechnicClgName: {
        type: Sequelize.STRING,
        allowNull: false
      },

      polytechnicPassingYear: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      polytechnicPercentage: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      ECETHallTicketNo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ECETRank: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("ecet");
  }
};
