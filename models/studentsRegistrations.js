module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "studentsRegistrations",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      nameOfApplicant: {
        type: DataTypes.STRING
      },
      fatherName: {
        type: DataTypes.STRING
      },
      dateOfBirth: {
        type: DataTypes.DATE
      },
      addressOfCommunication: {
        type: DataTypes.STRING
      },
      phoneNumber: {
        type: DataTypes.STRING
      },
      aadharNo: {
        type: DataTypes.STRING
      },
      category: {
        type: DataTypes.STRING
      },
      qualifyingDetails: {
        type: DataTypes.TEXT
      },
      nameofInstution: {
        type: DataTypes.STRING
      },
      courseName: {
        type: DataTypes.TEXT
      },
      paymentStructure: {
        type: DataTypes.STRING
      },
      withReferenceOf: {
        type: DataTypes.STRING
      },
      referance: {
        type: DataTypes.TEXT
      }
    },
    {
      sequelize,
      tableName: "studentsRegistrations",
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
