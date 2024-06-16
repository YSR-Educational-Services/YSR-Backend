module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("students", "date", {
        type: Sequelize.DATEONLY,
        allowNull: false
      })
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([queryInterface.removeColumn("students", "date")]);
  }
};
