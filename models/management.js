module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "management",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      clgName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      passingYear: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      percentage: {
        type: DataTypes.FLOAT,
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
      tableName: "management",
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
