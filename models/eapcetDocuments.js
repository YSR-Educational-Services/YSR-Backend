module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "EapcetDocuments",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      sscLongMemo: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      sscShortMemo: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      interLongMemo: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      interShortMemo: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      SSCBonafideCertificate: {
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
      HSCBonafideCertificate: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: true
      },
      interTC: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      EAPCETHallTicket: {
        type: DataTypes.ENUM("ORIGINAL", "XEROX"),
        allowNull: false
      },
      EAPCETRankCard: {
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
      }
    },
    {
      sequelize,
      tableName: "EapcetDocuments",
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
