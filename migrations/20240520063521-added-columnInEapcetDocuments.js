module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("EapcetDocuments", "adhaarCardXerox", {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      }),
      queryInterface.addColumn("EapcetDocuments", "incomeCertificate", {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      }),
      queryInterface.addColumn("EapcetDocuments", "castCertificate", {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      }),
      queryInterface.addColumn("EapcetDocuments", "ROC", {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      }),
      queryInterface.addColumn("EapcetDocuments", "HSCBonafideCertificate", {
        type: Sequelize.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      })
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn("EapcetDocuments", "adharCardXerox"),
      queryInterface.removeColumn("EapcetDocuments", "incomeCertificate"),
      queryInterface.removeColumn("EapcetDocuments", "castCertificate"),
      queryInterface.removeColumn("EapcetDocuments", "ROC"),
      queryInterface.removeColumn("EapcetDocuments", "HSCBonafideCertificate")
    ]);
  }
};
