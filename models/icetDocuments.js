module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "icetDocuments",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      degreeLongMemo: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      degreeShortMemo: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      degreeProvisional: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      adhaarCardXerox: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      incomeCertificate: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      castCertificate: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      ROC: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      degreeTC: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      ICETHallTicket: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      ICETRankCard: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      _student: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "students",
          key: "id"
        }
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      // Adding 8 semester certificates
      semester1Certificate: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      semester2Certificate: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      semester3Certificate: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      semester4Certificate: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      semester5Certificate: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      semester6Certificate: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      semester7Certificate: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      semester8Certificate: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      // Adding backlog certificate
      backlogCertificate: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: "icetDocuments",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }]
        },
        {
          name: "_student",
          using: "BTREE",
          fields: [{ name: "_student" }]
        }
      ]
    }
  );
};
