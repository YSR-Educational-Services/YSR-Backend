module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "icet",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      degreeClgName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      university: {
        type: DataTypes.STRING,
        allowNull: false
      },
      degreePassingYear: {
        type: DataTypes.STRING,
        allowNull: false
      },
      degreeObtainedMarks: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      degreePercentage: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      ICETHallTicketNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      ICETRank: {
        type: DataTypes.INTEGER,
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
      tableName: "icet",
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
