"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("refresh_tokens", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      _user: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "admin",
          key: "id",
        },
      },
      refreshToken: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("refresh_tokens");
  },
};
