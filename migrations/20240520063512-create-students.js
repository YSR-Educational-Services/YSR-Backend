"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("students", {
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
      requestType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneNumber1: {
        type: Sequelize.STRING
      },
      aadharNo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nameofInstution: {
        type: Sequelize.STRING,
        allowNull: true
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
      isDocumentsSubmitted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },
      isLoggedin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable("students");
  }
};
