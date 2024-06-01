module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "eapcet",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
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
      EAPCETHallTicketNo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      EAPCETRank: {
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
      tableName: "eapcet",
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
