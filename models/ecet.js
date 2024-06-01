module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "ecet",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
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
      tableName: "ecet",
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
