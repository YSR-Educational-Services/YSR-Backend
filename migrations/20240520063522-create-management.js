"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("management", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
     
      clgName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      passingYear: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      percentage: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable("management");
  }
};
