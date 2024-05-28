'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('studentsRegistrations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameOfApplicant: {
        type: Sequelize.STRING
      },
      fatherName: {
        type: Sequelize.STRING
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      addressOfCommunication: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      aadharNo: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      qualifyingDetails: {
        type: Sequelize.TEXT
      },
      nameofInstution: {
        type: Sequelize.STRING
      },
      courseName: {
        type: Sequelize.TEXT
      },
      paymentStructure: {
        type: Sequelize.STRING
      },
      withReferenceOf: {
        type: Sequelize.STRING
      },
      referance: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('studentsRegistrations');
  }
};

