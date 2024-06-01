module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "students",
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
      requestType: {
        type: DataTypes.STRING,
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
      courseName: {
        type: DataTypes.STRING,
        allowNull: true
      },
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
      tableName: "students",
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
