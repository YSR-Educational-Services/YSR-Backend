module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "EmcetStudentForm",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      nameOfApplicant: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fatherName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      addressOfCommunication: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
      },
      aadharNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sscSchoolName: {
        type: DataTypes.STRING,
        allowNull: false
      },

      sscPassingYear: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      sscPercentage: {
        type: DataTypes.FLOAT,
        allowNull: false
      },

      hscSchoolName: {
        type: DataTypes.STRING,
        allowNull: false
      },

      hscPassingYear: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      hscPercentage: {
        type: DataTypes.FLOAT,
        allowNull: false
      },

      EMCETHallTicketNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      EMCETRank: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      courseName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      // paymentStructure: {
      //   type: DataTypes.ENUM("One Time Payment", "Annual Payment"),
      //   allowNull: true
      // },
      withReferenceOf: {
        type: DataTypes.STRING,
        allowNull: true
      },
      reference: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: "EmcetStudentForm",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }]
        }
      ]
    }
  );
};
