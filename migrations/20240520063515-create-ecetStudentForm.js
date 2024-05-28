"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("EcetStudentForm", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameOfApplicant: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fatherName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      addressOfCommunication: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      aadharNo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
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
      EMCETHallTicketNo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      EMCETRank: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      courseName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      withReferenceOf: {
        type: Sequelize.STRING,
        allowNull: true
      },
      reference: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("EcetStudentForm");
  }
};
