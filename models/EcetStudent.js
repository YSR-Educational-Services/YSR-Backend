module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "EcetStudentForm",
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
      polytechnicClgName: {
        type: DataTypes.STRING,
        allowNull: false
      },
     
      polytechnicPassingYear: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      polytechnicPercentage: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      ECETHallTicketNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ECETRank: {
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
      tableName: "EcetStudentForm",
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
